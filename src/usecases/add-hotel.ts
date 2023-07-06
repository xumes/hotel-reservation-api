import { v4 as uuidv4 } from "uuid";
import { MissingParamError } from "../@shared/errors/missing-param-error";
import { AddHotelModel, AddressModel } from "../domain/hotel";

export class AddHotelUseCase {
  execute(hotelProps: AddHotelModel): string {
    const { name, address } = hotelProps;
    if (!name || name.trim() === "") {
      throw new MissingParamError("Hotel name is required");
    }

    if (!this.validateAddress(address)) {
      throw new MissingParamError("Hotel name is required");
    }

    return uuidv4();
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
