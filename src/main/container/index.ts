import { HotelRepository } from "../../data/repositories/hotel-repository";
import { RoomRepository } from "../../data/repositories/room-repository";
import { BookingService } from "../services/booking-service";
import { HotelService } from "../services/hotel-service";
import { RoomService } from "../services/room-service";
import { BookingRepository } from "../../data/repositories/booking-repository";

class Container {
  private hotelRepository: HotelRepository;
  private roomRepository: RoomRepository;
  private bookingRepository: BookingRepository;

  constructor() {
    this.hotelRepository = new HotelRepository();
    this.roomRepository = new RoomRepository();
    this.bookingRepository = new BookingRepository();
  }

  public getHotelService(): HotelService {
    return new HotelService(this.hotelRepository);
  }

  public getRoomservice(): RoomService {
    return new RoomService(this.roomRepository);
  }

  public getBookingService(): BookingService {
    return new BookingService(this.bookingRepository, this.roomRepository);
  }
}

export const container = new Container();
