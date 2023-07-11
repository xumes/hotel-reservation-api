import { PrismaClient } from "@prisma/client";
import { AddBookingModel, BookingModel } from "../../domain/model/booking";
import {
  HOTEL_ROOM_BOOKED_STATUS,
  HOTEL_ROOM_INCREMENT,
} from "../../domain/model/room";

export class BookingRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(bookingProps: AddBookingModel): Promise<BookingModel> {
    const { roomId, startDate, endDate, hotelId } = bookingProps;

    const bookingModel = await this.prisma.$transaction(async (prisma) => {
      const newBooking = await prisma.booking.create({
        data: {
          startDate,
          endDate,
          hotel: { connect: { id: hotelId } },
          room: { connect: { id: roomId } },
        },
      });

      await prisma.room.update({
        where: { id: roomId },
        data: {
          status: HOTEL_ROOM_BOOKED_STATUS,
        },
      });

      await prisma.hotel.update({
        where: { id: hotelId },
        data: {
          roomsAvailable: {
            decrement: HOTEL_ROOM_INCREMENT,
          },
          roomsBooked: {
            increment: HOTEL_ROOM_INCREMENT,
          },
        },
      });

      return {
        id: newBooking.id,
        startDate: newBooking.startDate,
        endDate: newBooking.endDate,
        hotelId: newBooking.hotelId,
        roomId: newBooking.roomId,
      };
    });

    return bookingModel;
  }

  async get(hotelId: string): Promise<any[]> {
    const booking = this.prisma.booking.findMany({
      where: { hotelId: hotelId },
      include: {
        hotel: true,
        room: true,
      },
    });

    return booking;
  }
}
