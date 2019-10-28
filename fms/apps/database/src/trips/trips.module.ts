import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ServiceModule,
  ],
  exports: [ServiceModule],
  controllers: [TripController],
})
export class TripsModule {
}
