import { MissingParamError } from "../@shared/errors/missing-param-error";
import { RoomModel, RoomStatus } from "../domain/room";

export class AddRoomUsecase {
  execute(roomProps: RoomModel): RoomModel {
    if (!this.validate(roomProps)) {
      throw new MissingParamError("All room data are required");
    }

    return roomProps;
  }

  private validate(roomProps: RoomModel) {
    const { number, price, status } = roomProps;
    if (!number || number <= 0) {
      return false;
    }
    if (!price || price <= 0) {
      return false;
    }
    if (!status) {
      return false;
    }
    if (!Object.values(RoomStatus).includes(status)) {
      return false;
    }

    return true;
  }
}
