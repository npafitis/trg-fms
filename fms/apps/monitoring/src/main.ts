import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      queue: 'monitoring_queue',
      queueOptions: { durable: false },
    },
  });

  app.listen(() => 'Monitoring Microservice is online');
}

bootstrap();
