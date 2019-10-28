import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatModule } from '../../monitoring/src/heartbeat/heartbeat.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [HeartbeatModule,
    ClientsModule.register([{ name: 'HEARTBEAT_SERVICE', transport: Transport.RMQ }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
