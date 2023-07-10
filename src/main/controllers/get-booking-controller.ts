import { Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { NotFoundError } from "../../@shared/errors/not-found-error";

export class GetBookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { hotelId } = req.params;

    try {
      const booking = await this.bookingService.getByHotelId(hotelId);

      res.status(200).json(booking);
    } catch (err) {
      if (err instanceof InvalidParamError) {
        res.status(400).json({ error: err.message });
      } else if (err instanceof MissingParamError) {
        res.status(400).json({ error: err.message });
      } else if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
      } else {
        console.log(err);
        res.status(500).end();
      }
    }
  }
}
