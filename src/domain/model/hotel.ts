export interface AddressModel {
  street: string;
  zipCode: string;
  country: string;
}

export interface HotelModel {
  id: string;
  name: string;
  address: AddressModel;
  roomsAvailable: number;
  roomsBooked: number;
}

export type AddHotelModel = Omit<
  HotelModel,
  "id" | "roomsAvailable" | "roomsBooked"
>;
