import { InvalidParamError } from "../../../src/@shared/errors/invalid-param-error";
import { HotelModel } from "../../../src/domain/model/hotel";
import { RoomModel } from "../../../src/domain/model/room";
import { MakeBookingUsecase } from "../../../src/domain/usecases/make-booking";

describe("Make Booking Usecase", () => {
  it("should throw InvalidParamError when booking date are invalid", () => {
    const testCases = [
      {
        hotelId: "123",
        roomNumber: 1,
        roomId: 1,
        room: {
          id: 1,
        } as RoomModel,
        hotel: {
          id: "123",
        } as HotelModel,
        startDate: "invalid",
        endDate: "2023-07-11",
      },
      {
        hotelId: "123",
        roomNumber: 2,
        roomId: 1,
        room: {
          id: 1,
        } as RoomModel,
        hotel: {
          id: "123",
        } as HotelModel,
        startDate: "2023-07-10",
        endDate: "invalid",
      },
      {
        hotelId: "123",
        roomNumber: 3,
        roomId: 1,
        room: {
          id: 1,
        } as RoomModel,
        hotel: {
          id: "123",
        } as HotelModel,
        startDate: "2023-07-11",
        endDate: "2023-07-10",
      },
    ];

    const makeBookingUsecase = new MakeBookingUsecase();

    testCases.forEach(
      ({ hotelId, roomNumber, roomId, room, hotel, startDate, endDate }) => {
        const fakeBooking = {
          hotelId,
          roomNumber,
          roomId,
          room,
          hotel,
          startDate,
          endDate,
        };

        expect(() => {
          makeBookingUsecase.execute(fakeBooking as any);
        }).toThrow(InvalidParamError);
      }
    );
  });

  it("should throw InvalidParamError when roomId does not match", () => {
    const testCases = [
      {
        hotelId: "123",
        roomNumber: 1,
        roomId: 5,
        room: {
          id: 6,
        } as RoomModel,
        hotel: {
          id: "123",
        } as HotelModel,
        startDate: "invalid",
        endDate: "2023-07-11",
      },
    ];

    const makeBookingUsecase = new MakeBookingUsecase();

    testCases.forEach(
      ({ hotelId, roomNumber, roomId, room, hotel, startDate, endDate }) => {
        const fakeBooking = {
          hotelId,
          roomNumber,
          roomId,
          room,
          hotel,
          startDate,
          endDate,
        };

        expect(() => {
          makeBookingUsecase.execute(fakeBooking as any);
        }).toThrow(InvalidParamError);
      }
    );
  });

  it("should throw InvalidParamError when hotelId does not match", () => {
    const testCases = [
      {
        hotelId: "ABC",
        roomNumber: 1,
        roomId: 1,
        room: {
          id: 1,
        } as RoomModel,
        hotel: {
          id: "DEF",
        } as HotelModel,
        startDate: "invalid",
        endDate: "2023-07-11",
      },
    ];

    const makeBookingUsecase = new MakeBookingUsecase();

    testCases.forEach(
      ({ hotelId, roomNumber, roomId, room, hotel, startDate, endDate }) => {
        const fakeBooking = {
          hotelId,
          roomNumber,
          roomId,
          room,
          hotel,
          startDate,
          endDate,
        };

        expect(() => {
          makeBookingUsecase.execute(fakeBooking as any);
        }).toThrow(InvalidParamError);
      }
    );
  });

  it("should make a booking with valid data", () => {
    const validBooking = {
      hotelId: "123",
      hotel: {
        id: "123",
      } as HotelModel,
      roomNumber: 10,
      roomId: 1,
      room: {
        id: 1,
      } as RoomModel,
      startDate: new Date("2023-07-10"),
      endDate: new Date("2023-07-11"),
    };

    const makeBookingUsecase = new MakeBookingUsecase();
    const myBooking = makeBookingUsecase.execute(validBooking);

    expect(myBooking.startDate).toStrictEqual(new Date(validBooking.startDate));
    expect(myBooking.endDate).toStrictEqual(new Date(validBooking.endDate));
  });
});
