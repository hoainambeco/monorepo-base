# Stage 1: Build the application
FROM node:20.15.0-alpine AS build

WORKDIR /app
RUN ls /app -al
COPY ./package*.json ./
RUN npm i
COPY ./ ./
RUN npm run build job-runner

# Stage 2: Create the final image
FROM node:20.15.0-alpine

WORKDIR /app
COPY --from=build /app/dist/apps/job-runner ./dist
COPY --from=build /app/node_modules ./node_modules
COPY ./package*.json ./

CMD [ "node" , "dist/main" ]

