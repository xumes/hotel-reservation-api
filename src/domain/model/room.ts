export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface RoomModel {
  number: number;
  price: number;
  status: RoomStatus;
}
