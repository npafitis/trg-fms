import { Document } from 'mongoose';

export interface Heartbeat extends Document {
  _id: number;
  driverId: number;
  carId: number;
  datetime: Date;
  coordinates: string;
  speed: number;
}
