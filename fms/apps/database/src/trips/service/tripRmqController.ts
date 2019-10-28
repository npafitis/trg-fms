import { Controller } from '@nestjs/common';
import { IApiCrud } from '../../shared/api-crud.interface';
import { TripDto } from '../shared/trip.dto';
import { TripService } from './trip.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Page } from '../../shared/page.class';
import { PagedData } from '../../shared/paged-data.class';

@Controller()
export class TripRmqController implements IApiCrud<TripDto> {
  constructor(private tripService: TripService) {
  }

  @MessagePattern({ cmd: 'getAll' })
  getAll(): Observable<TripDto[]> {
    return this.tripService.getAll();
  }

  @MessagePattern({ cmd: 'find' })
  find(@Payload() id: number): Observable<TripDto> {
    return this.tripService.find(id);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() resource: TripDto): Observable<TripDto> {
    return this.tripService.create(resource);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: number): Observable<TripDto> {
    return this.tripService.delete(id);
  }

  @MessagePattern({ cmd: 'get' })
  get(@Payload() page: Page): Observable<PagedData<TripDto>> {
    return this.tripService.get(page);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() payload: { id: number, resource: TripDto }): Observable<TripDto> {
    return this.tripService.update({ id: payload.id, resource: payload.resource });
  }
}
