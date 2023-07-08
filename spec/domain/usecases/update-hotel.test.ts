import { MissingParamError } from "../../../src/@shared/errors/missing-param-error";
import {
  AddHotelModel,
  AddressModel,
  HotelModel,
} from "../../../src/domain/model/hotel";
import { UpdateHotelUseCase } from "../../../src/domain/usecases/update-hotel";
import { RoomModel } from "../../../src/domain/model/room";

const existingHotel: HotelModel = {
  id: "valid-id",
  name: "Existing Hotel name",
  address: {
    id: "valid-id",
    street: "Street name",
    zipCode: "ABC123",
    country: "Bra",
  },
  roomsAvailable: 10,
  roomsBooked: 5,
  rooms: [] as RoomModel[],
};

describe("Update Hotel Usecase", () => {
  it("should throw MissingParamError when hotel name is not provided", () => {
    const testCases = [
      { id: 1, name: "" },
      { id: 2, name: null },
      { id: 3, name: undefined },
      { id: 4 },
    ];

    const updateHotelUseCase = new UpdateHotelUseCase();

    testCases.forEach(({ name }) => {
      const newHotelData = {
        name: name as string,
        address: {
          street: "Street name",
          zipCode: "ABC123",
          country: "Bra",
        },
      };

      expect(() =>
        updateHotelUseCase.execute(
          existingHotel as HotelModel,
          newHotelData as AddHotelModel
        )
      ).toThrowError(MissingParamError);
    });
  });

  it("should throw MissingParamError when address is not provided", () => {
    const testCases = [
      { address: { street: "" }, name: "Hotel name" },
      {
        address: { street: "Street name", zipCode: "" },
        name: "Hotel name",
      },
      {
        address: { street: "Street name", zipCode: "zip", country: "" },
        name: "Hotel name",
      },
    ];

    const updateHotelUseCase = new UpdateHotelUseCase();

    testCases.forEach(({ name, address }) => {
      const hotelData = {
        name,
        address: address as AddressModel, // Type assertion since name could be null or undefined
      };

      expect(() =>
        updateHotelUseCase.execute(existingHotel, hotelData as AddHotelModel)
      ).toThrowError(MissingParamError);
    });
  });

  it("should ensure roomsAvailable and roomsBooked never change on Hotel Update", () => {
    const newHotelData = {
      name: "new hotel name",
      address: {
        id: "valid-id",
        street: "new street name",
        zipCode: "123456",
        country: "CAN",
      },
      roomsAvailable: 9999,
      roomsBooked: 5555,
    };

    const updateHotelUseCase = new UpdateHotelUseCase();

    const hotel: HotelModel = updateHotelUseCase.execute(
      existingHotel,
      newHotelData
    );

    expect(hotel.roomsAvailable).toBe(existingHotel.roomsAvailable);
    expect(hotel.roomsBooked).toBe(existingHotel.roomsBooked);
  });

  it("should update Hotel data on success", () => {
    const newHotelData = {
      name: "new hotel name",
      address: {
        id: "valid-id",
        street: "new street name",
        zipCode: "123456",
        country: "CAN",
      },
    };

    const updateHotelUseCase = new UpdateHotelUseCase();

    const hotel: HotelModel = updateHotelUseCase.execute(
      existingHotel,
      newHotelData
    );

    expect(hotel.id).toBe(existingHotel.id);

    expect(hotel.name).toBe(newHotelData.name);

    expect(hotel.address).toStrictEqual(newHotelData.address);

    // Ensure rooms have not been changed
    expect(hotel.roomsAvailable).toBe(existingHotel.roomsAvailable);
    expect(hotel.roomsBooked).toBe(existingHotel.roomsBooked);
  });
});
