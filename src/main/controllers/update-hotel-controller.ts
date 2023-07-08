import { Request, Response } from "express";
import { AddHotelModel, HotelModel } from "../../domain/model/hotel";
import { HotelService } from "../services/hotel-service";

export class UpdateHotelController {
  private hotelService: HotelService;

  constructor(hotelService: HotelService) {
    this.hotelService = hotelService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, address } = req.body as AddHotelModel;
      const { hotel_id } = req.params;

      const hotelProps: AddHotelModel = {
        name,
        address,
      };

      const hotel: HotelModel = await this.hotelService.update(
        hotel_id,
        hotelProps
      );

      res.status(201).json(hotel);
    } catch (err) {
      // TODO: Handle the erros here
      console.log(err);
      res.status(500).end();
    }
  }
}
