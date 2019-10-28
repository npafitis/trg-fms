import { Injectable } from '@nestjs/common';
import { CarDto } from './shared/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './shared/car.entity';
import { CarRepository } from './car.repository';
import { DomainService } from '../shared/domain-service';

@Injectable()
export class CarService extends DomainService<CarDto, Car> {

  constructor(@InjectRepository(Car) repository: CarRepository) {
    super(repository);
  }
}
