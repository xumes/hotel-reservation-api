import { MissingParamError } from "../../src/@shared/errors/missing-param-error";
import { RoomModel } from "../../src/domain/room";
import { AddRoomUsecase } from "../../src/usecases/add-room";

describe("Add Room Usecase", () => {
  it("should throw MissingParamError when room number is not provided", () => {
    const fakeRoomProps = {
      price: 1,
      status: "ok",
    };

    const addRoomUsecase = new AddRoomUsecase();

    expect(() =>
      addRoomUsecase.execute(fakeRoomProps as RoomModel)
    ).toThrowError(MissingParamError);
  });
});
