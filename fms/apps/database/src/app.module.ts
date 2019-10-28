import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/shared/user.entity';
import { DriversModule } from './drivers/drivers.module';
import { Driver } from './drivers/shared/driver.entity';
import { CarsModule } from './cars/cars.module';
import { TripsModule } from './trips/trips.module';
import { Car } from './cars/shared/car.entity';
import { Trip } from './trips/shared/trip.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DriversModule,
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
    CarsModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
