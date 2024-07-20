import { Drone } from '../models/Drone';

const createDrone = async (droneData: any) => {
  const drone = new Drone(droneData);
  await drone.save();
  return drone;
};

const getDrones = async () => {
  return Drone.find();
};

const updateDrone = async (id: string, droneData: any) => {
  return Drone.findByIdAndUpdate(id, droneData, { new: true });
};

const deleteDrone = async (id: string) => {
  return Drone.findByIdAndDelete(id);
};

export default {
  createDrone,
  getDrones,
  updateDrone,
  deleteDrone,
};
