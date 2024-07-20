import mongoose, { Document, Schema } from 'mongoose';

interface Waypoint {
  alt: number;
  lat: number;
  lng: number;
}

interface Mission extends Document {
  altitude: number;
  speed: number;
  name: string;
  waypoints: Waypoint[];
  created_at: Date;
  updated_at: Date;
  drone_id: string;
}

const WaypointSchema = new Schema<Waypoint>({
  alt: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const MissionSchema = new Schema<Mission>({
  altitude: { type: Number, required: true },
  speed: { type: Number, required: true },
  name: { type: String, required: true },
  waypoints: { type: [WaypointSchema], required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  drone_id: { type: String, required: true },
});

const Mission = mongoose.model<Mission>('Mission', MissionSchema);

export { Mission };
