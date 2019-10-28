import { Controller } from '@nestjs/common';
import { IApiCrud } from '../../shared/api-crud.interface';
import { DriverDto } from '../shared/driver.dto';
import { Observable } from 'rxjs';
import { Page } from '../../shared/page.class';
import { PagedData } from '../../shared/paged-data.class';
import { DriverService } from './driver.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class DriverRmqController implements IApiCrud<DriverDto> {
  constructor(private driverService: DriverService) {
  }

  @MessagePattern({ cmd: 'getAll' })
  getAll(): Observable<DriverDto[]> {
    return this.driverService.getAll();
  }

  @MessagePattern({ cmd: 'find' })
  find(@Payload() id: number): Observable<DriverDto> {
    return this.driverService.find(id);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() resource: DriverDto): Observable<DriverDto> {
    return this.driverService.create(resource);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: number): Observable<DriverDto> {
    return this.driverService.delete(id);
  }

  @MessagePattern({ cmd: 'get' })
  get(@Payload() page: Page): Observable<PagedData<DriverDto>> {
    return this.driverService.get(page);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() payload: { id: number, resource: DriverDto }): Observable<DriverDto> {
    return this.driverService.update({ id: payload.id, resource: payload.resource });
  }

}
