import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { ServiceModule } from './service/service.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ServiceModule,
    ClientsModule.register([{ name: 'TRIP_SERVICE', transport: Transport.RMQ }])
  ],
  exports: [ServiceModule],
  controllers: [TripController],
})
export class TripsModule {
}
