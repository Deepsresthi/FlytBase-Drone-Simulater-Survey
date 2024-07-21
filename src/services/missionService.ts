import { Mission } from '../models/Mission';
import { FlightLog } from '../models/Flightlog';
import { Drone } from '../models/Drone';


export const createMissionService = async (
  missionData: any,
  droneId: string
) => {

  const drone = await Drone.findOne({ drone_id: droneId }).exec();
  if (!drone) {
    throw new Error('Drone not found');
  }

  if (await Mission.findOne({ mission_id: missionData.mission_id }).exec()) {
    throw new Error('Mission ID already exists');
  }

    const missionId = missionData.mission_id;

  const mission = new Mission({
    ...missionData,
    mission_id: missionId,
    drone_id: drone.drone_id,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await mission.save();

  const flightLog = new FlightLog({
    flight_id: `FL-${Date.now()}`,
      drone_id: drone.drone_id,
    mission_id: mission.mission_id,
    mission_name: mission.name,
    waypoints: mission.waypoints,
    speed: mission.speed,
    distance: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await flightLog.save();

  return mission;
};

const getMissions = async () => {
  return Mission.find();
};

const updateMission = async (id: string, missionData: any) => {
  return Mission.findByIdAndUpdate(id, missionData, { new: true });
};

const deleteMission = async (id: string) => {
  return Mission.findByIdAndDelete(id);
};

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371e3; 
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const startMission = async (missionId: string) => {
  const mission = await Mission.findById(missionId).exec();
  if (!mission) {
    throw new Error('Mission not found');
  }

  const drone = await Drone.findOne({ drone_id: mission.drone_id }).exec();
  if (!drone) {
    throw new Error('Drone not found');
  }

  const flightLog = new FlightLog({
    flight_id: `FL-${Date.now()}`,
    drone_id: drone.drone_id,
    mission_name: mission.name,
    mission_id: mission._id,
    waypoints: [], 
    speed: mission.speed,
    distance: 0,
    execution_start: new Date(),
    execution_end: null,
    created_at: new Date(),
    updated_at: new Date(),
  });
    
    flightLog.waypoints.push({
      time: 0,
      alt: mission.waypoints[0].alt,
      lat: mission.waypoints[0].lat,
      lng: mission.waypoints[0].lng,
    });

  const waypoints = mission.waypoints;
  let totalDistance = 0;
  let previousWaypoint = waypoints[0];
  let calculatedTime = 0; 
  for (let i = 1; i < waypoints.length; i++) {
    const currentWaypoint = waypoints[i];
    const distance = calculateDistance(
      previousWaypoint.lat,
      previousWaypoint.lng,
      currentWaypoint.lat,
      currentWaypoint.lng
    );
      totalDistance += distance;
      totalDistance = totalDistance / 1000;
      calculatedTime = totalDistance / (mission.speed);


    flightLog.waypoints.push({
      time: calculatedTime,
      alt: currentWaypoint.alt,
      lat: currentWaypoint.lat,
      lng: currentWaypoint.lng,
    });

  }

  flightLog.distance = totalDistance;
  await flightLog.save();

  return flightLog;
};

export const stopMission = async (missionId: string) => {
  const flightLog = await FlightLog.findOne({ mission_id: missionId });
  if (!flightLog) {
    throw new Error('Flight log not found');
  }

  flightLog.execution_end = new Date();
  await flightLog.save();

  return flightLog;
};

export const getFlightLogs = async (droneId: string) => {
  const flightLogs = await FlightLog.find({ drone_id: droneId }).exec();
  return flightLogs;
};

export default {
  createMissionService,
  getMissions,
  updateMission,
  deleteMission,
  startMission,
  stopMission,
};
