import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { IApiCrud } from '../../../database/src/shared/api-crud.interface';
import { HeartbeatDto } from './shared/heartbeat-dto';
import { Observable } from 'rxjs';
import { Page } from '../../../database/src/shared/page.class';
import { PagedData } from '../../../database/src/shared/paged-data.class';
import { ClientProxy } from '@nestjs/microservices';

@Controller('heartbeat')
export class HeartbeatController implements IApiCrud<HeartbeatDto> {
  constructor(@Inject('HEARTBEAT_SERVICE') private readonly client: ClientProxy) {
  }

  @Post('create')
  create(@Body() resource: HeartbeatDto): Observable<HeartbeatDto> {
    return this.client.send({ cmd: 'create' }, resource);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<HeartbeatDto> {
    return this.client.send({ cmd: 'delete' }, id);
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<HeartbeatDto> {
    return this.client.send({ cmd: 'find' }, id);
  }

  @Get('page')
  get(@Body() page: Page): Observable<PagedData<HeartbeatDto>> {
    return this.client.send({ cmd: 'get' }, page);
  }

  @Get()
  getAll(): Observable<HeartbeatDto[]> {
    return this.client.send({ cmd: 'getAll' }, {});
  }

  @Post('update')
  update(@Body() payload: { id: number; resource: HeartbeatDto }): Observable<HeartbeatDto> {
    return this.client.send({ cmd: 'update' }, payload);
  }

}
