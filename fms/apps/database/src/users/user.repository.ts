import { EntityRepository, Repository } from 'typeorm';
import { User } from './shared/user.entity';
import { UserDto } from './shared/user.dto';
import { DomainRepository } from '../shared/domain-repository.class';

@EntityRepository(User)
export class UserRepository extends DomainRepository<UserDto, User> {
}