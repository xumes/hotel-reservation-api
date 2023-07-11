# hotel-reservation-api

A Fullcycle challenge

## Installation

> Docker is required.

```console
git clone git@github.com:xumes/sudoku-api.git

cd sudoku-api

docker compose up
```

When you see the message Server is running at port: 3000 the game is up and running

## Unit Tests

Run all test cases

```console
npm test
```

## Considerations

Since I am running the migration and seeder at the moment docker is running the backend, sometimes it gets stuck. This is a bug I will fix later, and I know it will not count as part of the challenge, sorry.

## How to use the api

- First start getting a list of available hotels `POST /hotels`
- From here, you can decide if you want to get one hotel only with `GET /hotels/{hotelId}`
- You can create a new Hotel `POST /hotels` and inform: `{ name: "", address: { street: "", zipCode: "", country: "" } }`
- You can update Hotel info `PATCH /hotels/{hotelId}` and inform: `{ name: "", address: { street: "", zipCode: "", country: "" } }`
- You can create a new room in a hotel `POST /hotels/{hotelId}/room}` and inform: `{ number: 0, price: 0, status?: "AVAILABLE|UNAVAILABLE" }`
- Make a reservation `POST /booking/{hotelId}` and inform `{ roomNumber: 0, startDate: "", endDate: "" }`
- Find all reservations in a Hotel `GET /booking/{hotelId}`
  See details on our Swagger documentation running the aplication and navigating to `/docs`

## Future releases

Features that can be implemented to keep the game growing:

- Fix the issue on starting docker and running the seeders
- Add logic to control the period the hotel room is reserved
- Add logic to release the room after the time has gone

## Thank you

Is has been a wonderful opportunity put all this in place.
