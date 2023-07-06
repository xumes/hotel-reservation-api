import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { RoomModel } from "../model/room";
import {
  validateRoomNumber,
  validateRoomPrice,
  validateRoomStatus,
} from "../validators/room-validators";

export class AddRoomUsecase {
  execute(roomProps: RoomModel): RoomModel {
    if (!this.validate(roomProps)) {
      throw new MissingParamError("All room data are required");
    }

    return roomProps;
  }

  private validate(roomProps: RoomModel) {
    const { number, price, status } = roomProps;
    return (
      // return true is all validators return true
      validateRoomNumber(number) &&
      validateRoomPrice(price) &&
      validateRoomStatus(status)
    );
  }
}
