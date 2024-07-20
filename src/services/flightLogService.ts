import { FlightLog } from '../models/Flightlog';

const getFlightLogs = async (droneId: string) => {
  return FlightLog.find({ drone_id: droneId });
};

export default {
  getFlightLogs,
};
