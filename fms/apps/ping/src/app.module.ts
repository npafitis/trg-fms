import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatModule } from '../../monitoring/src/heartbeat/heartbeat.module';

@Module({
  imports: [HeartbeatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
