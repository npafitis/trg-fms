import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './shared/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserRmqController } from './userRmqController';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
        ClientsModule.register([{ name: 'USER_SERVICE', transport: Transport.RMQ }])
    ],
    providers: [UsersService],
    exports: [TypeOrmModule],
    controllers: [UserRmqController, UserController]
})
export class UsersModule {
}
