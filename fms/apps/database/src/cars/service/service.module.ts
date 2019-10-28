import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../shared/car.entity';
import { CarRepository } from './car.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarService } from './car.service';
import { CarRmqController } from './carRmqController';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, CarRepository]),
    ClientsModule.register([{ name: 'CAR_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [TypeOrmModule],
  providers: [CarService],
  controllers: [CarRmqController],
})
export class ServiceModule {
}
