import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HeartbeatDto } from '../../monitoring/src/heartbeat/heartbeat-dto';

import * as ip from 'ip';
import * as iplocate from 'node-iplocate';

const args = process.argv.slice(2);

@Injectable()
export class AppService {

  private lastHb: HeartbeatDto;

  constructor(@Inject('HEARTBEAT_SERVICE') private readonly client: ClientProxy) {
    this.heartbeat();
  }

  private heartbeat() {
    setInterval(() => {
      const addr = ip.address();
      const hb = new HeartbeatDto();
      iplocate(addr).then(res => {
        hb.driverId = parseInt(args[0]);
        hb.carId = parseInt(args[1]);
        hb.coordinates = `${res.longitude},${res.latitude}`;
        hb.datetime = new Date();
        if (!!this.lastHb) {
          hb.speed = this.distanceInKmBetweenEarthCoordinates(
            parseInt(hb.coordinates.split(',')[0]),
            parseInt(hb.coordinates.split(',')[1]),
            parseInt(this.lastHb.coordinates.split(',')[0]),
            parseInt(this.lastHb.coordinates.split(',')[1]));
        }
        this.client.send({ cmd: 'create' }, hb);
        this.lastHb = hb;
      });
    }, 5000);
  }

  private degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  private distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
}
