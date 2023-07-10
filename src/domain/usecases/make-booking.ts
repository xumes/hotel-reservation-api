import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { AddBookingModel } from "../model/booking";
import { compareDates } from "../validators/booking-validators";

export class MakeBookingUsecase {
  execute(bookingProps: AddBookingModel): AddBookingModel {
    const { startDate, endDate } = bookingProps;

    if (!compareDates(startDate, endDate)) {
      throw new InvalidParamError("Booking dates are invalid");
    }

    return bookingProps;
  }
}
