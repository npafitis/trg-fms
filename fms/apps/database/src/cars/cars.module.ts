import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './shared/car.entity';
import { CarRepository } from './car.repository';
import { CarRmqController } from './carRmqController';
import { CarController } from './car.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, CarRepository]),
    ClientsModule.register([{ name: 'CAR_SERVICE', transport: Transport.RMQ }])],
  exports: [TypeOrmModule],
  providers: [CarService],
  controllers: [CarRmqController, CarController],
})
export class CarsModule {
}
