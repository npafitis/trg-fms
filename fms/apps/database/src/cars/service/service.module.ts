import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../shared/car.entity';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';
import { CarRmqController } from './carRmqController';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, CarRepository]),
  ],
  exports: [TypeOrmModule],
  providers: [CarService],
  controllers: [CarRmqController],
})
export class ServiceModule {
}
