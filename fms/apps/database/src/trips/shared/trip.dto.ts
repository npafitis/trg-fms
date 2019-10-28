import { DriverDto } from '../../drivers/shared/driver.dto';
import { CarDto } from '../../cars/shared/car.dto';

export class TripDto {
  driver: DriverDto;
  car: CarDto;
  date: Date;
}
