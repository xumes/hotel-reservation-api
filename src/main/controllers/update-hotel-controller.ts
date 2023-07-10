import { Request, Response } from "express";
import { AddHotelModel, HotelModel } from "../../domain/model/hotel";
import { HotelService } from "../services/hotel-service";
import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { NotFoundError } from "../../@shared/errors/not-found-error";

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
