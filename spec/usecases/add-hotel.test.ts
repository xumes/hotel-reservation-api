import { validate } from "uuid";
import { MissingParamError } from "../../src/@shared/errors/missing-param-error";
import { AddHotelModel, AddressModel } from "../../src/domain/hotel";
import { AddHotelUseCase } from "../../src/usecases/add-hotel";

describe("Add Hotel Usecase", () => {
  it("should return MissingParamError when hotel name is not provided", () => {
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

  it("should return MissingParamError when address is not provided", () => {
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

  it("should return an ID on success", () => {
    const addHotelUseCase = new AddHotelUseCase();

    const validHotelData = {
      name: "Hotel name",
      address: { street: "street name", zipCode: "zip", country: "Bra" },
    };

    const id = addHotelUseCase.execute(validHotelData);

    expect(id).toBeTruthy();
    expect(validate(id)).toBe(true);
  });
});
