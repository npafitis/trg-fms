import { Controller } from '@nestjs/common';
import { IApiCrud } from '../../../../database/src/shared/api-crud.interface';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Page } from '../../../../database/src/shared/page.class';
import { PagedData } from '../../../../database/src/shared/paged-data.class';
import { HeartbeatDto } from '../shared/heartbeat-dto';
import { HeartbeatService } from './heartbeat.service';

@Controller()
export class HeartbeatRmqController implements IApiCrud<HeartbeatDto> {
  constructor(private service: HeartbeatService) {
  }

  @MessagePattern({ cmd: 'getAll' })
  getAll(): Observable<HeartbeatDto[]> {
    return this.service.getAll();
  }

  @MessagePattern({ cmd: 'find' })
  find(@Payload() id: number): Observable<HeartbeatDto> {
    return this.service.find(id);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() resource: HeartbeatDto): Observable<HeartbeatDto> {
    return this.service.create(resource);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: number): Observable<HeartbeatDto> {
    return this.service.delete(id);
  }

  @MessagePattern({ cmd: 'get' })
  get(@Payload() page: Page): Observable<PagedData<HeartbeatDto>> {
    return this.service.get(page);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() payload: { id: number, resource: HeartbeatDto }): Observable<HeartbeatDto> {
    return this.service.update({ id: payload.id, resource: payload.resource });
  }
}
