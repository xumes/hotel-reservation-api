import { MissingParamError } from "../@shared/errors/missing-param-error";
import { HotelModel } from "../domain/hotel";

export class AddOneHotelRoomUsecase {
  execute(hotel: HotelModel): HotelModel {
    const { id } = hotel;
    if (!id) {
      throw new MissingParamError("Hotel ID is required");
    }

    hotel.roomsAvailable++;

    return hotel;
  }
}
