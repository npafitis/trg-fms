import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatModule } from '../../monitoring/src/heartbeat/heartbeat.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/src/users/shared/user.entity';
import { Driver } from '../../database/src/drivers/shared/driver.entity';
import { Car } from '../../database/src/cars/shared/car.entity';
import { Trip } from '../../database/src/trips/shared/trip.entity';

@Module({
  imports: [
    HeartbeatModule,
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
    ClientsModule.register([{ name: 'HEARTBEAT_SERVICE', transport: Transport.RMQ }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
