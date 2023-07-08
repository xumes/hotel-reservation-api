import { PrismaClient } from "@prisma/client";
import { HotelModel } from "../../domain/model/hotel";

export class HotelRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getById(hotelId: string): Promise<HotelModel | null> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        address: true,
        rooms: true,
      },
    });

    if (!hotel) {
      return null;
    }

    const hotelModel: HotelModel = {
      id: hotel.id,
      name: hotel.name,
      address: {
        id: hotel.address.id,
        street: hotel.address.street,
        zipCode: hotel.address.zipCode,
        country: hotel.address.country,
      },
      roomsAvailable: hotel.roomsAvailable,
      roomsBooked: hotel.roomsBooked,
      rooms: hotel.rooms,
    };

    return hotelModel;
  }

  async create(hotel: HotelModel): Promise<void> {
    const {
      id,
      name,
      address: { street, zipCode, country },
      roomsAvailable,
      roomsBooked,
    } = hotel;
    await this.prisma.hotel.create({
      data: {
        id,
        name,
        address: {
          create: {
            id,
            street,
            zipCode,
            country,
          },
        },
        roomsAvailable,
        roomsBooked,
      },
    });
  }

  async update(hotel: HotelModel): Promise<void> {
    const {
      id,
      name,
      address: { street, zipCode, country },
      roomsAvailable,
      roomsBooked,
    } = hotel;

    await this.prisma.hotel.update({
      where: {
        id: id,
      },
      data: {
        name,
        address: {
          update: {
            street,
            zipCode,
            country,
          },
        },
        roomsAvailable,
        roomsBooked,
      },
      include: {
        address: true,
        rooms: true,
      },
    });
  }
}
