import { Request, Response } from "express";
import { HotelService } from "../services/hotel-service";

export class GetHotelController {
  private hotelService: HotelService;

  constructor(hotelService: HotelService) {
    this.hotelService = hotelService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { hotelId } = req.params;

    try {
      const hotel = await this.hotelService.get(hotelId);

      res.status(200).json(hotel);
    } catch (err) {
      // TODO: Handle the erros here
      console.log(err);
      res.status(500).end();
    }
  }
}
