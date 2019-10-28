import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../shared/driver.entity';
import { DriverRepository } from './driver.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DriverService } from './driver.service';
import { DriverRmqController } from './driverRmqController';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, DriverRepository]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
  ],
  providers: [DriverService],
  exports: [TypeOrmModule],
  controllers: [DriverRmqController],
})
export class ServiceModule {
}
