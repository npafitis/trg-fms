import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { IApiCrud } from '../shared/api-crud.interface';
import { DriverDto } from './shared/driver.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.class';
import { PagedData } from '../shared/paged-data.class';

@Controller('driver')
export class DriverController implements IApiCrud<DriverDto> {
  constructor(@Inject('DRIVER_SERVICE') private readonly client: ClientProxy) {
  }

  @Post('create')
  create(@Body() resource: DriverDto): Observable<DriverDto> {
    return this.client.send({ cmd: 'create' }, resource);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DriverDto> {
    return this.client.send({ cmd: 'delete' }, id);
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<DriverDto> {
    return this.client.send({ cmd: 'find' }, id);
  }

  @Get('page')
  get(@Body() page: Page): Observable<PagedData<DriverDto>> {
    return this.client.send({ cmd: 'get' }, page);
  }

  @Get()
  getAll(): Observable<DriverDto[]> {
    return this.client.send({ cmd: 'getAll' }, {});
  }

  @Post('update')
  update(@Body() payload: { id: number; resource: DriverDto }): Observable<DriverDto> {
    return this.client.send({ cmd: 'update' }, payload);
  }

}
