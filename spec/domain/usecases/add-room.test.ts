import { MissingParamError } from "../../../src/@shared/errors/missing-param-error";
import { RoomModel, RoomStatus } from "../../../src/domain/model/room";
import { AddRoomUsecase } from "../../../src/domain/usecases/add-room";

describe("Add Room Usecase", () => {
  it("should throw MissingParamError when data is invalid", () => {
    const testCases = [
      { price: 1, status: RoomStatus.AVAILABLE },
      { number: 1, status: RoomStatus.AVAILABLE },
      { number: 0, status: RoomStatus.AVAILABLE },
      { number: 1, price: -1, status: RoomStatus.AVAILABLE },
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

  it("should return a room on success", () => {
    const validRoom = {
      number: 1,
      price: 2,
      status: RoomStatus.AVAILABLE,
    };

    const addRoomUsecase = new AddRoomUsecase();
    const room = addRoomUsecase.execute(validRoom);

    expect(room).toStrictEqual(validRoom);
  });
});
