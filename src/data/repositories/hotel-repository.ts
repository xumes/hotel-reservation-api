import { PrismaClient } from "@prisma/client";
import { AddHotelModel, HotelModel } from "../../domain/model/hotel";
import { AddHotelUseCase } from "../../domain/usecases/add-hotel";

export class HotelRepository {
  private prisma: PrismaClient;
  private addHotelUsecase: AddHotelUseCase;

  constructor() {
    this.prisma = new PrismaClient();
    this.addHotelUsecase = new AddHotelUseCase();
  }

  async create(hotelProps: AddHotelModel): Promise<HotelModel> {
    const hotel = this.addHotelUsecase.execute(hotelProps);

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

    return hotel;
  }
}
