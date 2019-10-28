import { Injectable } from '@nestjs/common';
import { DriverDto } from './shared/driver.dto';
import { DomainService } from '../shared/domain-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './shared/driver.entity';
import { DriverRepository } from './driver.repository';

@Injectable()
export class DriverService extends DomainService<DriverDto, Driver> {
  constructor(@InjectRepository(Driver)  repository: DriverRepository) {
    super(repository);
  }

}
