import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { IApiCrud } from '../shared/api-crud.interface';
import { UserDto } from './shared/user.dto';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.class';
import { PagedData } from '../shared/paged-data.class';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController implements IApiCrud<UserDto> {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {
  }

  @Post('create')
  create(@Body() resource: UserDto): Observable<UserDto> {
    return this.client.send({ cmd: 'create' }, resource);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<UserDto> {
    return this.client.send({ cmd: 'delete' }, id);
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<UserDto> {
    return this.client.send({ cmd: 'find' }, id);
  }

  @Get('page')
  get(@Body() page: Page): Observable<PagedData<UserDto>> {
    return this.client.send({ cmd: 'get' }, page);
  }

  @Get()
  getAll(): Observable<UserDto[]> {
    return this.client.send({ cmd: 'getAll' }, {});
  }

  @Post('update')
  update(@Body() payload: { id: number; resource: UserDto }): Observable<UserDto> {
    return this.client.send({ cmd: 'update' }, payload);
  }

}
