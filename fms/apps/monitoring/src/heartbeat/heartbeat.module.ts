import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat.controller';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ServiceModule,
  ],
  exports: [
    ServiceModule,
  ],
  controllers: [HeartbeatController],
})
export class HeartbeatModule {
}
