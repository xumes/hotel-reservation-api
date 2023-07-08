import { validate } from "uuid";
import { MissingParamError } from "../../../src/@shared/errors/missing-param-error";
import {
  AddHotelModel,
  AddressModel,
  HotelModel,
} from "../../../src/domain/model/hotel";
import { AddHotelUseCase } from "../../../src/domain/usecases/add-hotel";

describe("Add Hotel Usecase", () => {
  it("should throw MissingParamError when hotel name is not provided", () => {
    const testCases = [
      { name: "" },
      { name: null },
      { name: undefined },
      { id: 1 },
    ];

    const addHotelUseCase = new AddHotelUseCase();

    testCases.forEach(({ name }) => {
      const hotelData = {
        name: name as string,
        address: {
          street: "Street name",
          zipCode: "ABC123",
          country: "Bra",
        },
      };

      expect(() =>
        addHotelUseCase.execute(hotelData as AddHotelModel)
      ).toThrowError(MissingParamError);
    });
  });

  it("should throw MissingParamError when address is not provided", () => {
    const testCases = [
      { address: { street: "" }, name: "Hotel name" },
      { address: { street: "Street name", zipCode: "" }, name: "Hotel name" },
      {
        address: { street: "Street name", zipCode: "zip", country: "" },
        name: "Hotel name",
      },
    ];

    const addHotelUseCase = new AddHotelUseCase();

    testCases.forEach(({ name, address }) => {
      const hotelData = {
        name,
        address: address as AddressModel, // Type assertion since name could be null or undefined
      };

      expect(() =>
        addHotelUseCase.execute(hotelData as AddHotelModel)
      ).toThrowError(MissingParamError);
    });
  });

  it("should create a Hotel on success", () => {
    const addHotelUseCase = new AddHotelUseCase();

    const validHotelData: AddHotelModel = {
      name: "Hotel name",

      address: {
        id: "123",
        street: "street name",
        zipCode: "zip",
        country: "Bra",
      },
    };

    const hotel: HotelModel = addHotelUseCase.execute(validHotelData);

    expect(hotel.id).toBeTruthy();
    expect(validate(hotel.id)).toBe(true);

    expect(hotel.name).toBe(validHotelData.name);

    expect(hotel.address).toStrictEqual(validHotelData.address);

    expect(hotel.roomsAvailable).toBe(0);
    expect(hotel.roomsBooked).toBe(0);
  });
});
