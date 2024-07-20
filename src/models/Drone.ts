import mongoose, { Document, Schema } from 'mongoose';

interface Drone extends Document {
  drone_id: string;
  created_at: Date;
  deleted_by: string | null;
  created_by: string;
  deleted_on: Date | null;
  drone_type: string;
  make_name: string;
  name: string;
  updated_at: Date;
}

const DroneSchema = new Schema<Drone>({
  drone_id: { type: String, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now },
  deleted_by: { type: String, default: null },
  created_by: { type: String, required: true },
  deleted_on: { type: Date, default: null },
  drone_type: { type: String, required: true },
  make_name: { type: String, required: true },
  name: { type: String, required: true },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Drone = mongoose.model<Drone>('Drone', DroneSchema);

export { Drone };
