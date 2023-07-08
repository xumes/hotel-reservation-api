import { Request, Response } from "express";
import { AddHotelModel } from "../../domain/model/hotel";
import { HotelService } from "../services/hotel-service";

export class AddHotelController {
  private hotelService: HotelService;

  constructor(hotelService: HotelService) {
    this.hotelService = hotelService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, address } = req.body as AddHotelModel;

      const hotelProps: AddHotelModel = { name, address };

      const hotel = await this.hotelService.create(hotelProps);

      res.status(201).json(hotel);
    } catch (err) {
      // TODO: Handle the erros here
      console.log(err);
    }
  }
}
