import { NotFoundError } from "../../@shared/errors/not-found-error";
import { HotelRepository } from "../../data/repositories/hotel-repository";
import { AddHotelModel, HotelModel } from "../../domain/model/hotel";
import { AddHotelUseCase } from "../../domain/usecases/add-hotel";
import { UpdateHotelUseCase } from "../../domain/usecases/update-hotel";

export class HotelService {
  private hotelRepository: HotelRepository;
  private addHotelUsecase: AddHotelUseCase;
  private updateHotelUsecase: UpdateHotelUseCase;

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository;
    this.addHotelUsecase = new AddHotelUseCase();
    this.updateHotelUsecase = new UpdateHotelUseCase();
  }

  async create(hotelProps: AddHotelModel): Promise<HotelModel> {
    const hotel = this.addHotelUsecase.execute(hotelProps);

    await this.hotelRepository.create(hotel);

    return hotel;
  }

  async update(id: string, hotelProps: AddHotelModel): Promise<HotelModel> {
    const currentHotel = await this.hotelRepository.getById(id);

    if (!currentHotel) {
      throw new NotFoundError();
    }

    const updatedHotel = this.updateHotelUsecase.execute(
      currentHotel,
      hotelProps
    );

    await this.hotelRepository.update(updatedHotel);

    return updatedHotel;
  }
}
