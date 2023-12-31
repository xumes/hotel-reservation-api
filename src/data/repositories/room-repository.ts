import { PrismaClient } from "@prisma/client";
import {
  AddRoomModel,
  HOTEL_ROOM_INCREMENT,
  RoomModel,
  RoomStatus,
} from "../../domain/model/room";

export class RoomRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(roomProps: AddRoomModel): Promise<RoomModel> {
    const { number, price, status, hotelId } = roomProps;
    const roomStatus = status as RoomStatus;

    const roomModel = await this.prisma.$transaction(async (prisma) => {
      const newRoom = await prisma.room.create({
        data: {
          number,
          price,
          status: roomStatus,
          hotel: { connect: { id: hotelId } },
        },
        select: {
          id: true,
          number: true,
          price: true,
          status: true,
          hotelId: true,
        },
      });

      await prisma.hotel.update({
        where: { id: hotelId },
        data: {
          roomsAvailable: {
            increment: HOTEL_ROOM_INCREMENT,
          },
        },
      });

      return {
        id: newRoom.id,
        price: newRoom.price,
        number: newRoom.number,
        status: newRoom.status as RoomStatus,
        hotelId: newRoom.hotelId,
      };
    });

    return roomModel;
  }

  async getIdByNumber(
    roomNumber: number,
    hotelId: string
  ): Promise<number | null> {
    const room = await this.prisma.room.findFirst({
      where: {
        hotelId: hotelId,
        number: roomNumber,
      },
      select: {
        id: true,
      },
    });

    return room?.id ?? null;
  }
}
