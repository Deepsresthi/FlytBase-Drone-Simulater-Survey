# Drone Simulator For Survey

This project enables the comprehensive management of drone missions, including creation, initiation, and termination of missions with specified waypoints for precise navigation. Leveraging Node.js, Express, MongoDB, and Mongoose, it calculates distance covered using advanced algorithms and logs detailed flight data, ensuring efficient and accurate drone operations.

## Running the code

- Have a mongo server running
- Create `.env` file at root, add below variables

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/drone-survey
JWT_SECRET=your_jwt_secret_key
```

- to run
  - `npm install`
  - `npm run`

## Code Structure

```
flytbase/
├── dist/                   
├── src/                    # Source code
│   ├── controllers/        
│   │   ├── authController.ts
│   │   ├── droneController.ts
│   │   ├── missionController.ts
│   │   └── flightLogController.ts
│   ├── models/             
│   │   ├── User.ts
│   │   ├── Drone.ts
│   │   ├── Mission.ts
│   │   └── FlightLog.ts
│   ├── routes/            
│   │   ├── authRoutes.ts
│   │   ├── droneRoutes.ts
│   │   ├── missionRoutes.ts
│   │   └── flightLogRoutes.ts
│   ├── services/            
│   │   ├── authService.ts
│   │   ├── droneService.ts
│   │   ├── missionService.ts
│   │   └── flightLogService.ts
│   ├── middleware/         
│   │   └── authMiddleware.ts
│   ├── utils/              
│   │   └── jwtUtils.ts
│   ├── types/         
│   │   └── express.ds.ts
│   ├── config/             
│   │   └── config.ts
│   ├── index.ts           
├── .env
├── .prettierrc
├── .prettierignore                    
├── .gitignore              
├── package.json            
├── tsconfig.json           
└── README.md   
```


## Haversine Formula
The Haversine Formula is used in this project to calculate the great-circle distance between two points on the Earth's surface. This is particularly useful for determining distances between waypoints in drone missions.

### Formula
The Haversine formula is given by:
```
R = earth’s radius (mean radius = 6,371km)

Δlat = lat2− lat1

Δlong = long2− long1

a = sin²(Δlat/2) + cos(lat1).cos(lat2).sin²(Δlong/2)

c = 2.atan2(√a, √(1−a))

d = R.c
```

## Data Model Descriptions

### User
A user represents an entity storing detailed information about a user. Here are the properties of a user:

- `username`: The unique username for the user (string). This field is required and must be unique.
- `email`: The email address of the user (string). This field is required and must be unique.
- `password`: The password for the user (string). This field is required.

### Drone
A drone represents a drone entity. Here are the properties of a drone:

- `drone_id`: The unique identifier for the drone (string). This field is required and must be unique.
- `created_at`: The date and time when the drone record was created (Date). This field is required and defaults to the current date and time.
- `deleted_by`: The identifier of the user who deleted the drone (string or null). This field is optional and defaults to null.
- `created_by`: The identifier of the user who created the drone record (string). This field is required.
- `deleted_on`: The date and time indicating when the drone record was deleted (Date or null). This field is optional and defaults to null.
- `drone_type`: The type of the drone (string). This field is required.
- `make_name`: The manufacturer of the drone (string). This field is required.
- `name`: The name of the drone (string). This field is required.
- `updated_at`: The date and time when the drone record was last updated (Date). This field is required and defaults to the current date and time.

### Mission
A mission represents an entity storing detailed information about a specific drone mission. Here are the properties of a mission:

- `altitude`: The altitude at which the mission is conducted (number). This field is required.
- `speed`: The speed of the drone during the mission (number). This field is required.
- `name`: The name of the mission (string). This field is required.
- `waypoints`: An array of waypoints, each representing a geographic point with latitude, longitude, and altitude.
- `created_at`: The date and time when the mission was created (date). This field is required and defaults to the current date and time.
- `updated_at`: The date and time when the mission was last updated (date). This field is required and defaults to the current date and time.
- `drone_id`: The unique identifier of the drone conducting the mission (string). This field is required.

#### Waypoint
A waypoint represents a geographic point used in defining the mission path. Here are the properties of a waypoint:

- `alt`: The altitude of the waypoint (number). This field is required.
- `lat`: The latitude of the waypoint (number). This field is required.
- `lng`: The longitude of the waypoint (number). This field is required.

### FlightLog
A flight log records detailed information about a drone's flight. Here are the properties of a flight log:

- `flight_id`: The unique identifier for the flight log (string). This field is required and must be unique.
- `drone_id`: The unique identifier of the drone that performed the flight (string). This field is required.
- `mission_id`: The unique identifier of the mission associated with the flight (string). This field is required.
- `mission_name`: The name of the mission associated with the flight (string). This field is required.
- `waypoints`: An array of waypoint logs, each representing a geographic point with time, latitude, longitude, and altitude.
- `speed`: The speed of the drone during the flight (number). This field is required.
- `distance`: The total distance covered by the drone during the flight (number). This field is required.
- `execution_start`: The date and time when the flight started (date). This field is optional and defaults to null.
- `execution_end`: The date and time when the flight ended (date). This field is optional and defaults to null.
- `created_at`: The date and time when the flight log was created (date). This field is required and defaults to the current date and time.
- `updated_at`: The date and time when the flight log was last updated (date). This field is required and defaults to the current date and time.

#### WaypointLog
A waypoint log represents a geographic point during the flight, with an associated time. Here are the properties of a waypoint log:

- `time`: The time at which the waypoint was reached (number). This field is optional and defaults to null.
- `alt`: The altitude of the waypoint (number). This field is required.
- `lat`: The latitude of the waypoint (number). This field is required.
- `lng`: The longitude of the waypoint (number). This field is required.

## API Documentation

[API Documentation](APIs.md)
