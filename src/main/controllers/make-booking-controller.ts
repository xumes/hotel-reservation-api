import { Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { BookingProps } from "../../domain/model/booking";
import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { NotFoundError } from "../../@shared/errors/not-found-error";

export class MakeBookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate, roomNumber } = req.body as BookingProps;
      const { hotelId } = req.params;

      const bookingProps: BookingProps = {
        roomNumber,
        startDate,
        endDate,
        hotelId,
      };

      const booking = await this.bookingService.create(bookingProps);

      res.status(201).json(booking);
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
