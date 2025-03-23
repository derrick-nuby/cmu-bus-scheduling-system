Thought for 3 seconds### CMU Bus Scheduling System API - Working Examples

## Table of Contents

- [Organizations](#organizations)
- [Users](#users)
- [Routes](#routes)
- [Buses](#buses)
- [Bus Stops](#bus-stops)
- [Passengers](#passengers)
- [Live Tracking](#live-tracking)

## Organizations

### POST /organizations

```json
// Example 1
{
  "name": "Carnegie Mellon University",
  "type": "COMPANY",
  "domain": "cmu.edu"
}

// Example 2
{
  "name": "CMU Orientation Week",
  "type": "EVENT",
  "domain": "orientation.cmu.edu"
}

// Example 3
{
  "name": "CMU School of Computer Science",
  "type": "COMPANY",
  "domain": "cs.cmu.edu"
}

// Example 4
{
  "name": "CMU Spring Carnival",
  "type": "EVENT",
  "domain": "carnival.cmu.edu"
}

// Example 5
{
  "name": "CMU Qatar Campus",
  "type": "COMPANY",
  "domain": "qatar.cmu.edu"
}
```

### PUT /organizations/id

```json
// Example 1
{
  "name": "Updated CMU Name",
  "domain": "updated-cmu.edu"
}

// Example 2
{
  "name": "CMU New Name"
}

// Example 3
{
  "domain": "new-domain.cmu.edu"
}

// Example 4
{
  "name": "Carnegie Mellon University - Main Campus",
  "domain": "main.cmu.edu"
}

// Example 5
{
  "name": "CMU Transportation Department",
  "domain": "transport.cmu.edu"
}
```

## Users

### POST /users/signup

```json
// Example 1
{
  "email": "admin@cmu.edu",
  "password": "securePassword123!",
  "name": "Admin User",
  "role": "SUPER_ADMIN",
  "organizationId": "org123"
}

// Example 2
{
  "email": "orgadmin@cmu.edu",
  "password": "securePassword456!",
  "name": "Org Admin User",
  "role": "ORG_ADMIN",
  "organizationId": "org123"
}

// Example 3
{
  "email": "driver@cmu.edu",
  "password": "driverPass789!",
  "name": "Bus Driver",
  "role": "DRIVER",
  "organizationId": "org123"
}

// Example 4
{
  "email": "oauth@cmu.edu",
  "name": "OAuth User",
  "role": "ORG_ADMIN",
  "organizationId": "org123",
  "oauthProvider": "google",
  "oauthId": "google-oauth-id-123"
}

// Example 5
{
  "email": "student@andrew.cmu.edu",
  "password": "studentPass321!",
  "name": "Student User",
  "role": "USER",
  "organizationId": "org123"
}
```

### POST /users/login

```json
// Example 1
{
  "email": "admin@cmu.edu",
  "password": "securePassword123!"
}

// Example 2
{
  "email": "orgadmin@cmu.edu",
  "password": "securePassword456!"
}

// Example 3
{
  "email": "driver@cmu.edu",
  "password": "driverPass789!"
}

// Example 4
{
  "oauthToken": "valid-oauth-token-123",
  "oauthProvider": "google"
}

// Example 5
{
  "email": "student@andrew.cmu.edu",
  "password": "studentPass321!"
}
```

### PUT /users/id

```json
// Example 1
{
  "name": "Updated Admin Name"
}

// Example 2
{
  "password": "newSecurePassword456!"
}

// Example 3
{
  "role": "ORG_ADMIN"
}

// Example 4
{
  "name": "John Smith",
  "email": "jsmith@cmu.edu"
}

// Example 5
{
  "name": "Sarah Johnson",
  "role": "DRIVER",
  "phoneNumber": "412-555-1234"
}
```

## Routes

### POST /routes

```json
// Example 1
{
  "organizationId": "org123",
  "name": "Campus Shuttle",
  "description": "Main campus shuttle route",
  "code": "CS001",
  "logo": "https://example.com/logo.png"
}

// Example 2
{
  "organizationId": "org123",
  "name": "East Campus Shuttle",
  "description": "East campus shuttle route",
  "logo": "https://example.com/east-logo.png"
}

// Example 3
{
  "organizationId": "org123",
  "name": "Airport Shuttle",
  "description": "Shuttle service to Pittsburgh International Airport",
  "code": "AS001",
  "logo": "https://example.com/airport-logo.png"
}

// Example 4
{
  "organizationId": "org123",
  "name": "Weekend Shuttle",
  "description": "Weekend service to local shopping areas",
  "code": "WS001",
  "logo": "https://example.com/weekend-logo.png"
}

// Example 5
{
  "organizationId": "org123",
  "name": "Late Night Shuttle",
  "description": "Late night service for students",
  "code": "LN001",
  "logo": "https://example.com/late-night-logo.png"
}
```

### PUT /routes/id

```json
// Example 1
{
  "name": "Updated Campus Shuttle",
  "description": "Updated main campus shuttle route"
}

// Example 2
{
  "name": "New Shuttle Name"
}

// Example 3
{
  "logo": "https://example.com/new-logo.png"
}

// Example 4
{
  "name": "Express Campus Shuttle",
  "description": "Express service with limited stops",
  "code": "ECS001"
}

// Example 5
{
  "description": "Revised route with additional stops",
  "logo": "https://example.com/revised-logo.png"
}
```

## Buses

### POST /buses

```json
// Example 1
{
  "routeId": "route123",
  "name": "Shuttle Bus 1",
  "plateNumber": "CMU-001",
  "capacity": 30,
  "status": "ACTIVE",
  "locationLatitude": 40.4432,
  "locationLongitude": -79.9428
}

// Example 2
{
  "routeId": "route123",
  "name": "Shuttle Bus 2",
  "plateNumber": "CMU-002",
  "capacity": 25,
  "status": "ACTIVE",
  "locationLatitude": 40.4435,
  "locationLongitude": -79.9430
}

// Example 3
{
  "routeId": "route456",
  "name": "Airport Shuttle",
  "plateNumber": "CMU-003",
  "capacity": 40,
  "status": "ACTIVE",
  "locationLatitude": 40.4438,
  "locationLongitude": -79.9432
}

// Example 4
{
  "routeId": "route789",
  "name": "Weekend Shuttle",
  "plateNumber": "CMU-004",
  "capacity": 35,
  "status": "INACTIVE",
  "locationLatitude": 40.4440,
  "locationLongitude": -79.9435
}

// Example 5
{
  "routeId": "route123",
  "name": "Late Night Shuttle",
  "plateNumber": "CMU-005",
  "capacity": 20,
  "status": "ACTIVE",
  "locationLatitude": 40.4442,
  "locationLongitude": -79.9438
}
```

### PUT /buses/id

```json
// Example 1
{
  "name": "Updated Shuttle Bus 1",
  "status": "INACTIVE"
}

// Example 2
{
  "locationLatitude": 40.4435,
  "locationLongitude": -79.9430
}

// Example 3
{
  "capacity": 35,
  "plateNumber": "CMU-001-NEW"
}

// Example 4
{
  "name": "Express Shuttle",
  "status": "ACTIVE",
  "locationLatitude": 40.4438,
  "locationLongitude": -79.9432
}

// Example 5
{
  "status": "ACTIVE",
  "capacity": 40
}
```

## Bus Stops

### POST /bus-stops

```json
// Example 1
{
  "routeId": "route123",
  "name": "University Center",
  "latitude": 40.4432,
  "longitude": -79.9428,
  "busLeft": false
}

// Example 2
{
  "routeId": "route123",
  "name": "Tepper School",
  "latitude": 40.4435,
  "longitude": -79.9430,
  "busLeft": false
}

// Example 3
{
  "routeId": "route123",
  "name": "Morewood Gardens",
  "latitude": 40.4438,
  "longitude": -79.9432,
  "busLeft": false
}

// Example 4
{
  "routeId": "route456",
  "name": "Forbes Avenue",
  "latitude": 40.4440,
  "longitude": -79.9435,
  "busLeft": true
}

// Example 5
{
  "routeId": "route789",
  "name": "Craig Street",
  "latitude": 40.4442,
  "longitude": -79.9438,
  "busLeft": false
}
```

### PUT /bus-stops/id

```json
// Example 1
{
  "name": "Updated University Center",
  "latitude": 40.4435,
  "longitude": -79.9430
}

// Example 2
{
  "busLeft": true
}

// Example 3
{
  "name": "New Stop Name"
}

// Example 4
{
  "latitude": 40.4438,
  "longitude": -79.9432,
  "name": "Relocated Stop"
}

// Example 5
{
  "name": "Fifth Avenue Stop",
  "busLeft": false
}
```

## Passengers

### POST /passengers

```json
// Example 1
{
  "routeId": "route123",
  "busId": "bus123",
  "nickname": "Student1",
  "status": "WAITING",
  "waitingLatitude": 40.4432,
  "waitingLongitude": -79.9428
}

// Example 2
{
  "routeId": "route123",
  "nickname": "WaitingStudent",
  "waitingLatitude": 40.4435,
  "waitingLongitude": -79.9430
}

// Example 3
{
  "routeId": "route456",
  "busId": "bus456",
  "nickname": "Faculty1",
  "status": "WAITING",
  "waitingLatitude": 40.4438,
  "waitingLongitude": -79.9432
}

// Example 4
{
  "routeId": "route789",
  "busId": "bus789",
  "nickname": "Visitor1",
  "status": "WAITING",
  "waitingLatitude": 40.4440,
  "waitingLongitude": -79.9435
}

// Example 5
{
  "routeId": "route123",
  "busId": "bus123",
  "nickname": "Staff1",
  "status": "WAITING",
  "waitingLatitude": 40.4442,
  "waitingLongitude": -79.9438
}
```

### PUT /passengers/id

```json
// Example 1
{
  "status": "BOARDED",
  "onboardLatitude": 40.4432,
  "onboardLongitude": -79.9428
}

// Example 2
{
  "busId": "bus456"
}

// Example 3
{
  "status": "LEFT",
  "leftLatitude": 40.4438,
  "leftLongitude": -79.9432
}

// Example 4
{
  "nickname": "UpdatedNickname"
}

// Example 5
{
  "status": "WAITING",
  "waitingLatitude": 40.4442,
  "waitingLongitude": -79.9438
}
```

## Live Tracking

### POST /live-tracking

```json
// Example 1
{
  "busId": "bus123",
  "routeId": "route123",
  "passengerId": "passenger123",
  "latitude": 40.4432,
  "longitude": -79.9428
}

// Example 2
{
  "busId": "bus456",
  "routeId": "route456",
  "passengerId": "passenger456",
  "latitude": 40.4435,
  "longitude": -79.9430
}

// Example 3
{
  "busId": "bus123",
  "routeId": "route123",
  "passengerId": "passenger789",
  "latitude": 40.4438,
  "longitude": -79.9432
}

// Example 4
{
  "busId": "bus789",
  "routeId": "route789",
  "passengerId": "passenger101",
  "latitude": 40.4440,
  "longitude": -79.9435
}

// Example 5
{
  "busId": "bus123",
  "routeId": "route123",
  "passengerId": "passenger202",
  "latitude": 40.4442,
  "longitude": -79.9438
}
```
