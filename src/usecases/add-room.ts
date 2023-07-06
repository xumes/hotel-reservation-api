import { MissingParamError } from "../@shared/errors/missing-param-error";
import { RoomModel } from "../domain/room";

export class AddRoomUsecase {
  execute(roomProps: RoomModel) {
    throw new MissingParamError("Room number is required");
  }
}
