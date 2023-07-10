import { Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { BookingProps } from "../../domain/model/booking";

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
      // TODO: Handle the erros here
      console.log(err);
      res.status(500).end();
    }
  }
}
