import { Request, Response } from "express";
import { HotelService } from "../services/hotel-service";

export class GetAllHotelController {
  private hotelService: HotelService;

  constructor(hotelService: HotelService) {
    this.hotelService = hotelService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const hotel = await this.hotelService.getAll();

      res.status(200).json(hotel);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
}
