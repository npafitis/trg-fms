import { Body, Controller, Delete, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { IApiCrud } from '../shared/api-crud.interface';
import { CarDto } from './shared/car.dto';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.class';
import { PagedData } from '../shared/paged-data.class';
import { ClientProxy } from '@nestjs/microservices';

@Controller('car')
export class CarController implements IApiCrud<CarDto> {
  constructor(@Inject('CAR_SERVICE') private readonly client: ClientProxy) {
  }

  @Post('create')
  create(@Body() resource: CarDto): Observable<CarDto> {
    return this.client.send({ cmd: 'create' }, resource);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<CarDto> {
    return this.client.send({ cmd: 'delete' }, id);
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<CarDto> {
    return this.client.send({ cmd: 'find' }, id);
  }

  @Get('page')
  get(@Body() page: Page): Observable<PagedData<CarDto>> {
    return this.client.send({ cmd: 'get' }, page);
  }

  @Get()
  getAll(): Observable<CarDto[]> {
    return this.client.send({ cmd: 'getAll' }, {});
  }

  @Post('update')
  update(@Body() payload: { id: number; resource: CarDto }): Observable<CarDto> {
    return this.client.send({ cmd: 'update' }, payload);
  }

}
