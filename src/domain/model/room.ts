export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface RoomModel {
  id: number;
  number: number;
  price: number;
  status: RoomStatus | string;
  hotelId: string;
}

export interface AddRoomModel extends Omit<RoomModel, "id"> {
  hotelId: string;
}

export interface AddRoomProps extends Omit<RoomModel, "id" | "status"> {
  status?: string;
}

export const HOTEL_ROOM_INCREMENT = 1;
