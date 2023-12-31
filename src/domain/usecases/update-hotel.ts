import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { AddHotelModel, HotelModel } from "../model/hotel";
import {
  validateHotelAddress,
  validateHotelName,
} from "../validators/hotel-validators";

export class UpdateHotelUseCase {
  execute(
    existingHotelProps: HotelModel,
    newHotelProps: AddHotelModel
  ): HotelModel {
    const { name, address } = newHotelProps;
    if (!validateHotelName(name)) {
      throw new MissingParamError("Hotel name is required");
    }

    if (!validateHotelAddress(address)) {
      throw new MissingParamError("Hotel address is required");
    }

    const updatedHotel: HotelModel = Object.assign({}, newHotelProps, {
      id: existingHotelProps.id,
      roomsAvailable: existingHotelProps.roomsAvailable,
      roomsBooked: existingHotelProps.roomsBooked,
      rooms: existingHotelProps.rooms,
    });

    return updatedHotel;
  }
}
