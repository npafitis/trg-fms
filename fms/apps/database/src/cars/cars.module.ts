import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { ServiceModule } from './service/service.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ServiceModule,
    ClientsModule.register([{ name: 'CAR_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [ServiceModule],
  controllers: [CarController],
})
export class CarsModule {
}
