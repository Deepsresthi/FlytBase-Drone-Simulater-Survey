import { Mission } from '../models/Mission';
import { FlightLog } from '../models/Flightlog';
import { Drone } from '../models/Drone';
import mongoose from 'mongoose';

export const createMissionService = async (
  missionData: any,
  droneId: string
) => {
  console.log(`Querying for drone with ID: ${droneId}`);
  console.log('Mission Data:', missionData); // Log the mission data
  //const drone_Id = new mongoose.Types.ObjectId(droneId);
  const drone = await Drone.findOne({ drone_id: droneId }).exec();
  console.log('Found Drone:', drone); // Log the found drone
  if (!drone) {
    throw new Error('Drone not found');
  }

  const mission = new Mission({
    ...missionData,
    drone_id: drone.drone_id,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await mission.save();

  const flightLog = new FlightLog({
    flight_id: `FL-${Date.now()}`,
    drone_id: drone.drone_id,
    mission_name: mission.name,
    waypoints: mission.waypoints,
    speed: mission.speed,
    distance: 0,
    // execution_start: new Date(),
    // execution_end: null,
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
  const R = 6371e3; // Earth radius in meters
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
    waypoints: [], // Initialize with empty waypoints
    speed: mission.speed,
    distance: 0,
    execution_start: new Date(),
    execution_end: null,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // Start simulation
  const waypoints = mission.waypoints;
  let totalDistance = 0;
  let previousWaypoint = waypoints[0];
  let previousTime = 0; // Start from 0 seconds
  for (let i = 1; i < waypoints.length; i++) {
    const currentWaypoint = waypoints[i];
    const distance = calculateDistance(
      previousWaypoint.lat,
      previousWaypoint.lng,
      currentWaypoint.lat,
      currentWaypoint.lng
    );
    totalDistance += distance;

    // Update the time property

    flightLog.waypoints.push({
      time: previousTime,
      alt: currentWaypoint.alt,
      lat: currentWaypoint.lat,
      lng: currentWaypoint.lng,
    });

    previousTime += 1;
  }

  flightLog.distance = totalDistance;
  await flightLog.save();

  return flightLog;
};

export const stopMission = async (missionId: string) => {
  //   const flightLog = await FlightLog.findOne({ mission_id: missionId }).exec();
  console.log('the missionId: ', missionId);
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
