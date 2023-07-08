import { HotelRepository } from "../../data/repositories/hotel-repository";
import { AddHotelModel, HotelModel } from "../../domain/model/hotel";

export class HotelService {
  private hotelRepository: HotelRepository;

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async create(hotelProps: AddHotelModel): Promise<HotelModel> {
    return await this.hotelRepository.create(hotelProps);
  }
}
