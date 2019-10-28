import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { ServiceModule } from './service/service.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ServiceModule,
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
  ],
  exports: [ServiceModule],
  controllers: [DriverController],
})
export class DriversModule {
}
