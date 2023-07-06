import { MissingParamError } from "../../src/@shared/errors/missing-param-error";
import { RoomModel } from "../../src/domain/room";
import { AddRoomUsecase } from "../../src/usecases/add-room";

describe("Add Room Usecase", () => {
  it("should throw MissingParamError when data is invalid", () => {
    const testCases = [
      { price: 1, status: "ok" },
      { number: 1, status: "ok" },
      { number: 1, price: -1, status: "ok" },
      { number: 1, price: 2 },
      { number: 1, price: 2, status: "invalid-status" },
    ];

    const addRoomUsecase = new AddRoomUsecase();

    testCases.forEach(({ number, price, status }) => {
      const fakeRoomProps = { number, price, status };

      expect(() =>
        addRoomUsecase.execute(fakeRoomProps as RoomModel)
      ).toThrowError(MissingParamError);
    });
  });
});
