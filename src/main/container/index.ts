import { HotelRepository } from "../../data/repositories/hotel-repository";
import { HotelService } from "../services/hotel-service";

class Container {
  private hotelRepository: HotelRepository;

  constructor() {
    this.hotelRepository = new HotelRepository();
  }

  public getHotelService(): HotelService {
    return new HotelService(this.hotelRepository);
  }
}

export const container = new Container();
