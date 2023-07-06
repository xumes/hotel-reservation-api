export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface Room {
  number: number;
  price: number;
  status: string;
}
