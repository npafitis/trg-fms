import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatModule } from './heartbeat/heartbeat.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo/nest'), HeartbeatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
