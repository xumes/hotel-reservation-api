import { AddressModel } from "../model/hotel";

export function validateHotelName(name: string) {
  if (!name || name.trim() === "") {
    return false;
  }

  return true;
}

export function validateHotelAddress(addressProps: AddressModel): boolean {
  for (const key in addressProps) {
    if (!addressProps[key as keyof AddressModel]) {
      return false;
    }
  }
  return true;
}
