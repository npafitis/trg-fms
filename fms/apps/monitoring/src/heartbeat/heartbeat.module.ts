import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatSchema } from './heartbeat.schema';
import { HeartbeatRmqController } from './heartbeat-rmq.controller';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';
import { DriversModule } from '../../../database/src/drivers/drivers.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Heartbeat', schema: HeartbeatSchema },
    ]),
    ClientsModule.register([{ name: 'HEARTBEAT_SERVICE', transport: Transport.RMQ }]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
    DriversModule,
  ],
  exports: [ClientsModule],
  controllers: [HeartbeatRmqController, HeartbeatController],
  providers: [HeartbeatService],
})
export class HeartbeatModule {
}
