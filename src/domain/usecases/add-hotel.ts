import { v4 as uuidv4 } from "uuid";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { AddHotelModel, HotelModel } from "../model/hotel";
import {
  validateHotelName,
  validateHotelAddress,
} from "../validators/hotel-validators";

export class AddHotelUseCase {
  execute(hotelProps: AddHotelModel): HotelModel {
    const { name, address } = hotelProps;
    if (!validateHotelName(name)) {
      throw new MissingParamError("Hotel name is required");
    }

    if (!validateHotelAddress(address)) {
      throw new MissingParamError("Hotel address is required");
    }

    return {
      name,
      address,
      id: uuidv4(),
      // always create a hotel without rooms
      // they will be created later at addRoomUsecase
      roomsAvailable: 0,
      roomsBooked: 0,
    };
  }
}
