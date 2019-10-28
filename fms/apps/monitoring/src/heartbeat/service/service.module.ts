import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatSchema } from '../shared/heartbeat.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatRmqController } from './heartbeat-rmq.controller';
import { ServiceModule as DriverModule } from '../../../../database/src/drivers/service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Heartbeat', schema: HeartbeatSchema },
    ]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
    DriverModule,
  ],
  exports: [
    HeartbeatService,
    MongooseModule,
  ],
  controllers: [HeartbeatRmqController],
  providers: [HeartbeatService],

})
export class ServiceModule {
}
