import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { AddBookingModel } from "../model/booking";
import { compareDates } from "../validators/booking-validators";

export class MakeBookingUsecase {
  execute(bookingProps: AddBookingModel): AddBookingModel {
    const { room, roomId, hotel, hotelId, startDate, endDate } = bookingProps;

    if (roomId !== room.id) {
      throw new InvalidParamError("Room ID is invalid");
    }

    if (hotelId !== hotel.id) {
      throw new InvalidParamError("Hotel ID is invalid");
    }

    if (!compareDates(startDate, endDate)) {
      throw new InvalidParamError("Booking dates are invalid");
    }

    return bookingProps;
  }
}
