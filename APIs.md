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
