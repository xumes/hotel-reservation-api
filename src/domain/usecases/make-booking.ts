import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { BookingModel, BookingProps } from "../model/booking";
import { compareDates } from "../validators/booking-validators";
import { validateRoomNumber } from "../validators/room-validators";

export class MakeBookingUsecase {
    execute(bookingProps: BookingProps): BookingModel {
        const { roomNumber, startDate, endDate } = bookingProps

        if (!validateRoomNumber(roomNumber)) {
            throw new MissingParamError("Booking room number is required")
        }

        if (!compareDates(startDate, endDate)) {
            throw new InvalidParamError("Booking dates are invalid")
        }

        return {
            roomNumber, 
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        }
    }
}