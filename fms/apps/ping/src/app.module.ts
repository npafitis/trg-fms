import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/src/users/shared/user.entity';
import { Driver } from '../../database/src/drivers/shared/driver.entity';
import { Car } from '../../database/src/cars/shared/car.entity';
import { Trip } from '../../database/src/trips/shared/trip.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceModule } from '../../monitoring/src/heartbeat/service/service.module';

@Module({
  imports: [
    ServiceModule,
    ClientsModule.register([{ name: 'HEARTBEAT_SERVICE', transport: Transport.RMQ }]),
    ClientsModule.register([{ name: 'DRIVER_SERVICE', transport: Transport.RMQ }]),
    MongooseModule.forRoot('mongodb://mongo/nest'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'fms',
      password: 'secret',
      database: 'fms',
      entities: [User, Driver, Car, Trip],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
