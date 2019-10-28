import { EntityRepository, Repository } from 'typeorm';
import { Trip } from '../shared/trip.entity';
import { TripDto } from '../shared/trip.dto';
import { DomainRepository } from '../../shared/domain-repository.class';

@EntityRepository(Trip)
export class TripRepository extends DomainRepository<TripDto, Trip> {
}
