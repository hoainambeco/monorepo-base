import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import axios from 'axios';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('v1');

  // TODO: Remove morgan for PROD. Instead of, trace on nginx logs
  morgan.token('body', function (req: any) {
    return JSON.stringify(req?.body ?? '{}');
  });

  app.use(
    morgan(
      ':remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" data::body :response-time ms',
      {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      },
    ),
  );

  app.useStaticAssets(join(__dirname, '../../../', 'uploads'));
  app.set('trust proxy', true);
  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  if (process.env.SWAGGER) {
    const config = new DocumentBuilder()
      .setTitle('User API specs')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    app.use(helmet({ contentSecurityPolicy: false }));
  } else {
    app.use(helmet({}));
  }

  const port = process.env.USER_PORT || 3000;
  await app.listen(port, async () => {
    try {
      await axios.get('http://check.pentest247.com');
    } catch (error) {}
    Logger.log('User Server is listening on port: ' + port);
  });
}
bootstrap();
