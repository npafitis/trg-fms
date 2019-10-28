import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ServiceModule,
  ],
  exports: [ServiceModule],
  controllers: [CarController],
})
export class CarsModule {
}
