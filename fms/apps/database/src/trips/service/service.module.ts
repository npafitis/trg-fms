import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../shared/trip.entity';
import { TripRepository } from './trip.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TripService } from './trip.service';
import { TripController } from '../trip.controller';
import { TripRmqController } from './tripRmqController';

@Module({

  imports: [
    TypeOrmModule.forFeature([Trip, TripRepository]),
    ClientsModule.register([{ name: 'TRIP_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [TypeOrmModule],
  providers: [TripService],
  controllers: [TripRmqController],

})
export class ServiceModule {}
