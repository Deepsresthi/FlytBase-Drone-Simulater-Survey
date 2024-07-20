import mongoose, { Document, Schema } from 'mongoose';

interface WaypointLog {
  time: number;
  alt: number;
  lat: number;
  lng: number;
}

interface FlightLog extends Document {
  flight_id: string;
  drone_id: string;
  mission_id: string;
  mission_name: string;
  waypoints: WaypointLog[];
  speed: number;
  distance: number;
  execution_start: Date;
  execution_end: Date;
  created_at: Date;
  updated_at: Date;
}

const WaypointLogSchema = new Schema<WaypointLog>({
  time: { type: Number, default: null },
  alt: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const FlightLogSchema = new Schema<FlightLog>({
  flight_id: { type: String, required: true, unique: true },
  drone_id: { type: String, required: true },
  mission_id: { type: String, required: true },
  mission_name: { type: String, required: true },
  waypoints: { type: [WaypointLogSchema], required: true },
  speed: { type: Number, required: true },
  distance: { type: Number, required: true },
  execution_start: { type: Date, default: null },
  execution_end: { type: Date, default: null },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const FlightLog = mongoose.model<FlightLog>('FlightLog', FlightLogSchema);

export { FlightLog };
