import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './shared/driver.entity';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';
import { DriverRmqController } from './driverRmqController';
import { DriverController } from './driver.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, DriverRepository]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [TypeOrmModule],
  providers: [DriverService],
  controllers: [DriverController, DriverRmqController],
})
export class DriversModule {
}
