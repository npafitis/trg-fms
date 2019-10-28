import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../shared/trip.entity';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';
import { TripRmqController } from './tripRmqController';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, TripRepository]),
  ],
  exports: [TypeOrmModule],
  providers: [TripService],
  controllers: [TripRmqController],
})
export class ServiceModule {
}
