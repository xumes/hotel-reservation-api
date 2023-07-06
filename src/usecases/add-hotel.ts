import { v4 as uuidv4 } from "uuid";
import { MissingParamError } from "../@shared/errors/missing-param-error";
import { AddHotelModel, AddressModel, HotelModel } from "../domain/hotel";

export class AddHotelUseCase {
  execute(hotelProps: AddHotelModel): HotelModel {
    const { name, address } = hotelProps;
    if (!name || name.trim() === "") {
      throw new MissingParamError("Hotel name is required");
    }

    if (!this.validateAddress(address)) {
      throw new MissingParamError("Hotel name is required");
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

  private validateAddress(addressProps: AddressModel): boolean {
    for (const key in addressProps) {
      if (!addressProps[key as keyof AddressModel]) {
        return false;
      }
    }
    return true;
  }
}
