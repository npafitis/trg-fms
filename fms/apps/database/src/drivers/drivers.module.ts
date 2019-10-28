import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ServiceModule,
  ],
  exports: [ServiceModule],
  controllers: [DriverController],
})
export class DriversModule {
}
