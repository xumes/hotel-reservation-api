import { MissingParamError } from "../../src/@shared/errors/missing-param-error";
import { HotelModel } from "../../src/domain/hotel";
import { AddOneHotelRoomUsecase } from "../../src/usecases/add-one-hotel-room-available";

describe("Add One Hotel Room Available Usecase", () => {
  it("should throws MissingParamError when hotel id is missing", () => {
    const testCases = [{ id: null }, { id: 0 }, {}];

    const addOneHotelRoomUsecase = new AddOneHotelRoomUsecase();

    testCases.forEach(({ id }) => {
      const hotelFake = {
        id: id as any,
        roomsAvailable: 0,
      };
      expect(() =>
        addOneHotelRoomUsecase.execute(hotelFake as any as HotelModel)
      ).toThrow(MissingParamError);
    });
  });

  it("should add one room to the hotel on success", () => {
    const testCases = [
      { id: 1, roomsAvailable: 0, expectedResult: 1 },
      { id: 2, roomsAvailable: 2, expectedResult: 3 },
      { id: 3, roomsAvailable: 99, expectedResult: 100 },
    ];

    const addOneHotelRoomUsecase = new AddOneHotelRoomUsecase();

    testCases.forEach(({ id, roomsAvailable, expectedResult }) => {
      const hotel = addOneHotelRoomUsecase.execute({
        id,
        roomsAvailable,
      } as any as HotelModel);

      expect(hotel.roomsAvailable).toBe(expectedResult);
    });
  });
});
