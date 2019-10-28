import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const monitoringms = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      queue: 'monitoring_queue',
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
