export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface RoomModel {
  number: number;
  price: number;
  status: string;
}

export interface AddRoomModel extends Omit<RoomModel, "status"> {
  status?: string;
}
