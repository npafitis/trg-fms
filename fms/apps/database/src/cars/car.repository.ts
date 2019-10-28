import { EntityRepository } from 'typeorm';
import { Car } from './shared/car.entity';
import { CarDto } from './shared/car.dto';
import { DomainRepository } from '../shared/domain-repository.class';

@EntityRepository(Car)
export class CarRepository extends DomainRepository<CarDto, Car> {
}