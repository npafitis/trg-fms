import * as mongoose from 'mongoose';
import { model } from 'mongoose';

export const HeartbeatSchema = new mongoose.Schema({
  id: { type: Number, unique: true, min: 1 },
  driverId: Number,
  datetime: Date,
  carId: Number,
  coordinates: String,
  speed: Number,
});

export const heartbeat = model('Heartbeat', HeartbeatSchema);

HeartbeatSchema.pre('save', function(next) {
  // Only increment when the document is new
  if (this.isNew) {
    heartbeat.countDocuments().then(res => {
      this.id = res;
      next();
    });
  } else {
    next();
  }
});
