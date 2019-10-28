import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CarDto } from './shared/car.dto';
import { CarService } from './car.service';
import { Observable } from 'rxjs';
import { PagedData } from '../shared/paged-data.class';
import { Page } from '../shared/page.class';
import { IApiCrud } from '../shared/api-crud.interface';

@Controller()
export class CarRmqController implements IApiCrud<CarDto> {

  constructor(private carService: CarService) {
  }

  @MessagePattern({ cmd: 'getAll' })
  getAll(): Observable<CarDto[]> {
    return this.carService.getAll();
  }

  @MessagePattern({ cmd: 'find' })
  find(@Payload() id: number): Observable<CarDto> {
    return this.carService.find(id);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() resource: CarDto): Observable<CarDto> {
    return this.carService.create(resource);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: number): Observable<CarDto> {
    return this.carService.delete(id);
  }

  @MessagePattern({ cmd: 'get' })
  get(@Payload() page: Page): Observable<PagedData<CarDto>> {
    return this.carService.get(page);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() payload: { id: number, resource: CarDto }): Observable<CarDto> {
    return this.carService.update({ id: payload.id, resource: payload.resource });
  }

}
