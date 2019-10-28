import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.class';
import { PagedData } from '../shared/paged-data.class';
import { ClientProxy } from '@nestjs/microservices';
import { IApiCrud } from '../shared/api-crud.interface';
import { TripDto } from './shared/trip.dto';

@Controller('trip')
export class TripController implements IApiCrud<TripDto> {
  constructor(@Inject('TRIP_SERVICE') private readonly client: ClientProxy) {
  }

  @Post('create')
  create(@Body() resource: TripDto): Observable<TripDto> {
    return this.client.send({ cmd: 'create' }, resource);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<TripDto> {
    return this.client.send({ cmd: 'delete' }, id);
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<TripDto> {
    return this.client.send({ cmd: 'find' }, id);
  }

  @Get('page')
  get(@Body() page: Page): Observable<PagedData<TripDto>> {
    return this.client.send({ cmd: 'get' }, page);
  }

  @Get()
  getAll(): Observable<TripDto[]> {
    return this.client.send({ cmd: 'getAll' }, {});
  }

  @Post('update')
  update(@Body() payload: { id: number; resource: TripDto }): Observable<TripDto> {
    return this.client.send({ cmd: 'update' }, payload);
  }
}
