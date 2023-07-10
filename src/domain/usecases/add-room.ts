import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { AddRoomModel, RoomModel } from "../model/room";
import {
  validateRoomNumber,
  validateRoomPrice,
} from "../validators/room-validators";

export class AddRoomUsecase {
  execute(roomProps: AddRoomModel): RoomModel {
    if (!this.validate(roomProps)) {
      throw new MissingParamError("All room data are required");
    }

    return roomProps as RoomModel;
  }

  private validate(roomProps: AddRoomModel) {
    const { number, price } = roomProps;
    return (
      // return true is all validators return true
      validateRoomNumber(number) && validateRoomPrice(price)
    );
  }
}
