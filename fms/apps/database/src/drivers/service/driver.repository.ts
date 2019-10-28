import { EntityRepository } from 'typeorm';
import { Driver } from '../shared/driver.entity';
import { DomainRepository } from '../../shared/domain-repository.class';
import { DriverDto } from '../shared/driver.dto';

@EntityRepository(Driver)
export class DriverRepository extends DomainRepository<DriverDto, Driver> {
}
