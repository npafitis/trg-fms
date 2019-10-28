import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './shared/trip.entity';
import { TripRepository } from './trip.repository';
import { TripRmqController } from './tripRmqController';
import { TripController } from './trip.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, TripRepository]),
    ClientsModule.register([{ name: 'TRIP_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [TypeOrmModule],
  providers: [TripService],
  controllers: [TripRmqController, TripController],
})
export class TripsModule {
}
