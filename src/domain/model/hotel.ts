import { RoomModel } from "./room";

export interface AddressModel {
  id: string;
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
  rooms: RoomModel[];
}

export type AddHotelModel = Omit<
  HotelModel,
  "id" | "roomsAvailable" | "roomsBooked" | "rooms"
>;
