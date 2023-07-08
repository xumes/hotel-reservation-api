import { HotelModel } from "./hotel";
import { RoomModel } from "./room";

export interface BookingModel {
  id: number;
  startDate: Date;
  endDate: Date;
  roomId: number;
  room: RoomModel;
  hotelId: string;
  hotel: HotelModel;
}

export interface BookingProps {
  roomNumber: number;
  startDate: string;
  endDate: string;
}
