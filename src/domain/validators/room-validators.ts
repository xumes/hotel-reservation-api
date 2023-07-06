import { RoomStatus } from "../model/room";

export function validateRoomNumber(roomNumber: number): boolean {
  if (!roomNumber || roomNumber <= 0) {
    return false;
  }

  return true;
}

export function validateRoomPrice(roomPrice: number): boolean {
  if (!roomPrice || roomPrice <= 0) {
    return false;
  }

  return true;
}

export function validateRoomStatus(roomStatus: RoomStatus): boolean {
  if (!roomStatus) {
    return false;
  }
  if (!Object.values(RoomStatus).includes(roomStatus)) {
    return false;
  }

  return true;
}
