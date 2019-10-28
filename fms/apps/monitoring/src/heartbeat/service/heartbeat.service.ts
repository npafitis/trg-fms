import { Inject, Injectable } from '@nestjs/common';
import { Heartbeat } from '../shared/heartbeat.interface';
import { InjectModel } from '@nestjs/mongoose';
import { IApiCrud } from '../../../../database/src/shared/api-crud.interface';
import { Observable } from 'rxjs';
import { Page } from '../../../../database/src/shared/page.class';
import { PagedData } from '../../../../database/src/shared/paged-data.class';
import { Model } from 'mongoose';
import { HeartbeatDto } from '../shared/heartbeat-dto';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ClientProxy } from '@nestjs/microservices';
import { Driver } from '../../../../database/src/drivers/shared/driver.entity';

@Injectable()
export class HeartbeatService implements IApiCrud<HeartbeatDto> {
  constructor(@InjectModel('Heartbeat') private heartbeatModel: Model<Heartbeat>,
              @Inject('DRIVER_SERVICE') private readonly client: ClientProxy) {
  }

  create(resource: HeartbeatDto): Observable<HeartbeatDto> {
    if (resource.speed > 100) {
      this.client.send({ cmd: 'find' }, resource.driverId).subscribe(res => {
        const driver: Driver = res;
        driver.points += 5;
        this.client.send({ cmd: 'update' },
          { id: resource.driverId, resource: driver });
      });
    } else if (resource.speed > 80) {
      this.client.send({ cmd: 'find' }, resource.driverId).subscribe(res => {
        const driver: Driver = res;
        driver.points += 2;
        this.client.send({ cmd: 'update' },
          { id: resource.driverId, resource: driver });
      });
    } else if (resource.speed > 60) {
      this.client.send({ cmd: 'find' }, resource.driverId).subscribe(res => {
        const driver: Driver = res;
        driver.points++;
        this.client.send({ cmd: 'update' },
          { id: resource.driverId, resource: driver });
      });
    }
    const createdHb: Heartbeat = new this.heartbeatModel(resource);
    return fromPromise(createdHb.save());
  }

  delete(id: number): Observable<HeartbeatDto> {
    return fromPromise(this.heartbeatModel.findOne({ id: id })
      .then(item => {
        this.heartbeatModel.deleteOne({ id: id });
        return item;
      }));
  }

  find(id: number): Observable<HeartbeatDto> {
    return fromPromise(this.heartbeatModel.findOne({ id: id }));
  }

  get(page: Page): Observable<PagedData<HeartbeatDto>> {
    return fromPromise(this.heartbeatModel
      .find()
      .skip(page.size * page.currentPage)
      .limit(page.size).then(items => {
        return new PagedData({ page, items });
      }));
  }

  getAll(): Observable<HeartbeatDto[]> {
    return fromPromise(this.heartbeatModel.find().then(items => {
      return items;
    }));
  }

  update(payload: { id: number; resource: HeartbeatDto }): Observable<HeartbeatDto> {
    return fromPromise(this.heartbeatModel
      .update({ id: payload.id }, payload.resource)
      .then(() => {
        return payload.resource;
      }));
  }

}
