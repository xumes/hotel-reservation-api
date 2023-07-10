import { Request, Response } from "express";
import { BookingService } from "../services/booking-service";

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
      // TODO: Handle the erros here
      console.log(err);
      res.status(500).end();
    }
  }
}
