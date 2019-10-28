import { Controller } from '@nestjs/common';
import { IApiCrud } from '../shared/api-crud.interface';
import { UserDto } from './shared/user.dto';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.class';
import { PagedData } from '../shared/paged-data.class';

@Controller()
export class UserRmqController implements IApiCrud<UserDto> {
  constructor(private userService: UsersService) {
  }

  @MessagePattern({ cmd: 'getAll' })
  getAll(): Observable<UserDto[]> {
    return this.userService.getAll();
  }

  @MessagePattern({ cmd: 'find' })
  find(@Payload() id: number): Observable<UserDto> {
    return this.userService.find(id);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() resource: UserDto): Observable<UserDto> {
    return this.userService.create(resource);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: number): Observable<UserDto> {
    return this.userService.delete(id);
  }

  @MessagePattern({ cmd: 'get' })
  get(@Payload() page: Page): Observable<PagedData<UserDto>> {
    return this.userService.get(page);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() payload: { id: number, resource: UserDto }): Observable<UserDto> {
    return this.userService.update({ id: payload.id, resource: payload.resource });
  }
}
