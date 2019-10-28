import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/src/users/shared/user.entity';
import { Driver } from '../../database/src/drivers/shared/driver.entity';
import { Car } from '../../database/src/cars/shared/car.entity';
import { Trip } from '../../database/src/trips/shared/trip.entity';

@Module({
  imports: [
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
    MongooseModule.forRoot('mongodb://mongo/nest'),
    HeartbeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
