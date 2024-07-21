# API Documentation

## Register User

### POST /api/register

Registers a new user with the provided credentials.

#### Request Body

```json
{
  "username":"testuser",
  "email": "testuser@gmail.com",
  "password": "12345"
}
```

#### Response

1. 200 OK

```json
{
    "message": "User registered successfully"
}
```

2. 400 Bad Request

```json
{
  "msg": "User already exists"
}
```
3. 500 Internal Server Error
   
```json
{
  "msg": "An unexpected error occurred"
}
```

## Login User

### POST /api/login

Authenticates a user with the provided email and password. Returns a JWT token upon successful authentication.

#### Request Body

```json
{
  "email": "testuser@gmail.com",
  "password": "12345"
}
```

#### Response

1. 200 OK

```json
{
  "token": "your_jwt_token"
}
```

2. 400 Bad Request

```json
{
  "msg": "Invalid email or password"
}
```
3. 500 Internal Server Error
   
```json
{
  "msg": "An unexpected error occurred"
}
```

## Creating Drone

### POST /api/drones

Creates a new drone.

#### Request Body

```json
{
  "drone_id": "DR12345",
  "drone_type": "Quadcopter",
  "make_name": "DJI",
  "name": "Phantom",
  "created_by": "admin"
}
```

#### Response

1. 201 Created

```json
{
    "drone_id": "DR12345",
    "deleted_by": null,
    "created_by": "admin",
    "deleted_on": null,
    "drone_type": "Quadcopter",
    "make_name": "DJI",
    "name": "Phantom",
    "_id": "669c99ff2e9396f5b379783c",
    "created_at": "2024-07-21T05:17:51.919Z",
    "updated_at": "2024-07-21T05:17:51.921Z",
    "__v": 0
}
```

2. 400 Bad Request

```json
{
  "error": "Validation error: [details]"
}
```

## Get All Drones

### GET /api/drones

Retrieves a list of all drones.

#### Response

1. 200 OK

```json
[
    {
        "_id": "669b3e1c358f445c3b5cc74e",
        "drone_id": "507f1f77bcf86cd799439011",
        "deleted_by": null,
        "created_by": "507f1f77bcf86cd799439011",
        "deleted_on": null,
        "drone_type": "Real Drone",
        "make_name": "cloudsim",
        "name": "Virtual Drone",
        "created_at": "2024-07-20T04:33:32.212Z",
        "updated_at": "2024-07-20T04:33:32.212Z",
        "__v": 0
    },
    {
        "_id": "669c99ff2e9396f5b379783c",
        "drone_id": "DR12345",
        "deleted_by": null,
        "created_by": "admin",
        "deleted_on": null,
        "drone_type": "Quadcopter",
        "make_name": "DJI",
        "name": "Phantom",
        "created_at": "2024-07-21T05:17:51.919Z",
        "updated_at": "2024-07-21T05:17:51.921Z",
        "__v": 0
    }
]
```

## Update Drone

### PUT /api/drones/:id

Updates the details of an existing drone

Request Params:
id: The unique identifier of the drone to update.

#### Request Body

```json
{
  "drone_id": "DR12345",
  "drone_type": "Quadcopter",
  "make_name": "DJI",
  "name": "Phantom",
  "created_by": "FlyBase Inc"
}
```

#### Response

1. 200 OK

```json
{
    "_id": "669c99ff2e9396f5b379783c",
    "drone_id": "DR12345",
    "deleted_by": null,
    "created_by": "FlyBase Inc",
    "deleted_on": null,
    "drone_type": "Quadcopter",
    "make_name": "DJI",
    "name": "Phantom",
    "created_at": "2024-07-21T05:17:51.919Z",
    "updated_at": "2024-07-21T05:17:51.921Z",
    "__v": 0
}
```

2. 400 Bad Request

```json
{
  "error": "Validation error: [details]"
}
```
3. 404 Not Found
   
```json
{
  "error": "Validation error: [details]"
}
```
## Delete Drone

### DELETE /api/drones/:id

Updates the details of an existing drone

Request Params:
id: The unique identifier of the drone to update.

#### Response

1. 200 OK

```json
{
  "message": "Drone deleted successfully"
}
```

2. 404 Not Found
   
```json
{
  "error": "Drone not found"
}
```

## Creating Mission

### POST /api/mission

Creates a new mission

#### Request Body

```json
{
  "altitude": 100,
  "speed": 50,
  "name": "Survey Mission",
  "waypoints": [
    { "alt": 100, "lat": 34.0219, "lng": -118.4814 },
    { "alt": 150, "lat": 34.0220, "lng": -118.4820 }
  ],
  "drone_id": "DR12345",
  "mission_id": "2024M1"
}
```

#### Response

1. 201 Created

```json
{
    "mission_id": "2024M1",
    "altitude": 100,
    "speed": 50,
    "name": "Survey Mission",
    "waypoints": [
        {
            "alt": 100,
            "lat": 34.0219,
            "lng": -118.4814,
            "_id": "669cb3c4f3fe67378a8c9acb"
        },
        {
            "alt": 150,
            "lat": 34.022,
            "lng": -118.482,
            "_id": "669cb3c4f3fe67378a8c9acc"
        }
    ],
    "created_at": "2024-07-21T07:07:48.183Z",
    "updated_at": "2024-07-21T07:07:48.183Z",
    "drone_id": "DR12345",
    "_id": "669cb3c4f3fe67378a8c9aca",
    "__v": 0
}
```

2. 400 Bad Request

```json
{
  "error": "Validation error: [details]"
}
```

## Get All Mission

### GET /api/mission

Get all the mission created.

#### Response

1. 200 OK

```json
[
    {
        "_id": "669b9a7fb288ac1e39ed00f5",
        "altitude": 100,
        "speed": 50,
        "name": "Mission 1",
        "waypoints": [
            {
                "alt": 40,
                "lat": 37.42987269786578,
                "lng": -122.08320293735657,
                "_id": "669b9a7fb288ac1e39ed00f6"
            },
            {
                "alt": 40,
                "lat": 37.43087269786578,
                "lng": -122.08420293735657,
                "_id": "669b9a7fb288ac1e39ed00f7"
            },
            {
                "alt": 40,
                "lat": 37.43187269786578,
                "lng": -122.08520293735657,
                "_id": "669b9a7fb288ac1e39ed00f8"
            }
        ],
        "created_at": "2024-07-20T11:07:43.599Z",
        "updated_at": "2024-07-20T11:07:43.599Z",
        "drone_id": "DR12345",
        "__v": 0
    },
    {
        "_id": "669cb3c4f3fe67378a8c9aca",
        "mission_id": "2024M1",
        "altitude": 100,
        "speed": 50,
        "name": "Survey Mission",
        "waypoints": [
            {
                "alt": 100,
                "lat": 34.0219,
                "lng": -118.4814,
                "_id": "669cb3c4f3fe67378a8c9acb"
            },
            {
                "alt": 150,
                "lat": 34.022,
                "lng": -118.482,
                "_id": "669cb3c4f3fe67378a8c9acc"
            }
        ],
        "created_at": "2024-07-21T07:07:48.183Z",
        "updated_at": "2024-07-21T07:07:48.183Z",
        "drone_id": "DR12345",
        "__v": 0
    }
]
```

## Update Mission

### PUT /api/mission/:id

Update a mission.

Request Params:

id: The unique identifier of the mission to update.

#### Request Body

```json
{
  "mission_id": "2024M0"
}
```

#### Response

1. 201 Created

```json
{
    "_id": "669b9a7fb288ac1e39ed00f5",
    "altitude": 100,
    "speed": 50,
    "name": "Mission 1",
    "waypoints": [
        {
            "alt": 40,
            "lat": 37.42987269786578,
            "lng": -122.08320293735657,
            "_id": "669b9a7fb288ac1e39ed00f6"
        },
        {
            "alt": 40,
            "lat": 37.43087269786578,
            "lng": -122.08420293735657,
            "_id": "669b9a7fb288ac1e39ed00f7"
        },
        {
            "alt": 40,
            "lat": 37.43187269786578,
            "lng": -122.08520293735657,
            "_id": "669b9a7fb288ac1e39ed00f8"
        }
    ],
    "created_at": "2024-07-20T11:07:43.599Z",
    "updated_at": "2024-07-20T11:07:43.599Z",
    "drone_id": "DR12345",
    "__v": 0,
    "mission_id": "M02024"
}
```

2. 400 Bad Request

```json
{
  "error": "Validation error: [details]"
}
```

3. 404 Not Found

```json
{
  "error": "Mission not found"
}
```

## Delete Mission

### DELETE /api/mission/:id

Delete a mission.

Request Params:

id: The unique identifier of the mission to delete.

#### Response

1. 200 OK

```json
{
  "message": "Mission deleted successfully"
}
```

2. 404 Not Found

```json
{
  "error": "Mission not found"
}
```

## Start Mission

### POST /api/mission/:id/start

Start a mission.

Request Params:

id: The unique identifier of the mission to start.

#### Response

1. 201 Created

```json
{
    "flight_id": "FL-1721550215440",
    "drone_id": "DR12345",
    "mission_id": "669b9a7fb288ac1e39ed00f5",
    "mission_name": "Mission 1",
    "waypoints": [
        {
            "time": 0,
            "alt": 40,
            "lat": 37.42987269786578,
            "lng": -122.08320293735657,
            "_id": "669cc587e272bfcc23e4a660"
        },
        {
            "time": 0.0028397912565155388,
            "alt": 40,
            "lat": 37.43087269786578,
            "lng": -122.08420293735657,
            "_id": "669cc587e272bfcc23e4a661"
        },
        {
            "time": 0.005682407633300645,
            "alt": 40,
            "lat": 37.43187269786578,
            "lng": -122.08520293735657,
            "_id": "669cc587e272bfcc23e4a662"
        }
    ],
    "speed": 50,
    "distance": 0.28412038166503223,
    "execution_start": "2024-07-21T08:23:35.440Z",
    "execution_end": null,
    "created_at": "2024-07-21T08:23:35.440Z",
    "updated_at": "2024-07-21T08:23:35.440Z",
    "_id": "669cc587e272bfcc23e4a65f",
    "__v": 0
}
```

2. 400 Bad Request

```json
{
  "error": "Validation error: [details]"
}
```

3. 404 Not Found

```json
{
  "error": "Mission not found"
}
```


## Stop Mission

### POST /api/mission/:id/stop

Stop a mission.

Request Params:

id: The unique identifier of the mission to stop.

#### Response

1. 200 OK

```json
{
    "_id": "669cc4af09f14ccbfb566eee",
    "flight_id": "FL-1721549999647",
    "drone_id": "DR12345",
    "mission_id": "669b9a7fb288ac1e39ed00f5",
    "mission_name": "Mission 1",
    "waypoints": [
        {
            "time": 0.0028397912565155388,
            "alt": 40,
            "lat": 37.43087269786578,
            "lng": -122.08420293735657,
            "_id": "669cc4af09f14ccbfb566eef"
        },
        {
            "time": 0.005682407633300645,
            "alt": 40,
            "lat": 37.43187269786578,
            "lng": -122.08520293735657,
            "_id": "669cc4af09f14ccbfb566ef0"
        }
    ],
    "speed": 50,
    "distance": 0.28412038166503223,
    "execution_start": "2024-07-21T08:19:59.647Z",
    "execution_end": "2024-07-21T08:28:34.183Z",
    "created_at": "2024-07-21T08:19:59.647Z",
    "updated_at": "2024-07-21T08:19:59.647Z",
    "__v": 0
}
```

2. 404 Not Found

```json
{
  "error": "Mission not found"
}
```
