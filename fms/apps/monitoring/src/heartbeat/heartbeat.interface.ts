import { Document } from 'mongoose';

export interface Heartbeat extends Document {
  driverId: number;
  carId: number;
  datetime: Date;
  coordinates: string;
  speed: number;
}
