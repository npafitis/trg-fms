import { Injectable } from '@nestjs/common';
import { TripDto } from './shared/trip.dto';
import { DomainService } from '../shared/domain-service';
import { Trip } from './shared/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService extends DomainService<TripDto, Trip> {
  constructor(@InjectRepository(Trip)  repository: TripRepository) {
    super(repository);
  }
}
