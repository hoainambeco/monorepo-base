import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';

@Module({
  imports: [
    // BullModule.registerQueue({
    //   name: 'check-malwareBytes-job',
    //   defaultJobOptions: {
    //     removeOnComplete: true,
    //     attempts: 3,
    //   },
    // }),
  ],
})
export class BullBoardModule implements NestModule {
  // @Inject(getQueueToken('check-malwareBytes-job'))
  // private readonly malwareBytesJobQueue: Queue;
  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: [
        // new BullAdapter(this.malwareBytesJobQueue),
      ],
      serverAdapter,
    });

    serverAdapter.setBasePath('/api/bull-board');

    consumer
      .apply(
        expressBasicAuth({
          users: {
            [process.env.BULL_BOARD_USERNAME]: process.env.BULL_BOARD_PASSWORD,
          },
          challenge: true,
        }),
        serverAdapter.getRouter(),
      )
      .forRoutes('/bull-board');
  }
}
