import { NotFoundError } from "../../@shared/errors/not-found-error";
import { BookingRepository } from "../../data/repositories/booking-repository";
import { RoomRepository } from "../../data/repositories/room-repository";
import {
  AddBookingModel,
  BookingModel,
  BookingProps,
} from "../../domain/model/booking";
import { MakeBookingUsecase } from "../../domain/usecases/make-booking";

export class BookingService {
  private bookingRepository: BookingRepository;
  private roomRepository: RoomRepository;
  private makeBookingUsecase: MakeBookingUsecase;

  constructor(
    bookingRepository: BookingRepository,
    roomRepository: RoomRepository
  ) {
    this.bookingRepository = bookingRepository;
    this.roomRepository = roomRepository;

    this.makeBookingUsecase = new MakeBookingUsecase();
  }

  async create(bookingProps: BookingProps): Promise<BookingModel> {
    const { startDate, endDate, roomNumber, hotelId } = bookingProps;

    const roomId = await this.roomRepository.getIdByNumber(roomNumber, hotelId);
    if (!roomId) {
      throw new NotFoundError();
    }

    const addBookingModel: AddBookingModel = {
      hotelId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      roomId,
    };

    const booking = this.makeBookingUsecase.execute(addBookingModel);

    return await this.bookingRepository.create(booking);
  }

  async getByHotelId(hotelId: string): Promise<any[]> {
    const list = await this.bookingRepository.get(hotelId);
    if (!list) {
      throw new NotFoundError();
    }

    return list;
  }
}
