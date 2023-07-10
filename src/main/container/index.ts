import { HotelRepository } from "../../data/repositories/hotel-repository";
import { RoomRepository } from "../../data/repositories/room-repository";
import { HotelService } from "../services/hotel-service";
import { RoomService } from "../services/room-service";

class Container {
  private hotelRepository: HotelRepository;
  private roomRepository: RoomRepository;

  constructor() {
    this.hotelRepository = new HotelRepository();
    this.roomRepository = new RoomRepository();
  }

  public getHotelService(): HotelService {
    return new HotelService(this.hotelRepository);
  }

  public getRoomservice(): RoomService {
    return new RoomService(this.roomRepository);
  }
}

export const container = new Container();
