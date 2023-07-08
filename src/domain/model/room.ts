export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface RoomModel {
  id: number;
  number: number;
  price: number;
  status: string;
}

export interface AddRoomModel extends Omit<RoomModel, "id" | "status"> {
  status?: string;
}
