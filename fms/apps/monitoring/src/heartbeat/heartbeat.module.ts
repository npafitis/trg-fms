import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat.controller';
import { ServiceModule } from './service/service.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ServiceModule,
    ClientsModule.register([{ name: 'HEARTBEAT_SERVICE', transport: Transport.RMQ }]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [
    ServiceModule,
  ],
  controllers: [HeartbeatController],
})
export class HeartbeatModule {
}
