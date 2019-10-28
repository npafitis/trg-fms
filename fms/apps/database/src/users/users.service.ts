import { Injectable } from '@nestjs/common';
import { UserDto } from './shared/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './shared/user.entity';
import { UserRepository } from './user.repository';
import { DomainService } from '../shared/domain-service';

@Injectable()
export class UsersService extends DomainService<UserDto, User> {

  constructor(@InjectRepository(User) repository: UserRepository) {
    super(repository);
  }
}
