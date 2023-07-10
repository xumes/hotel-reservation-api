import { Request, Response } from "express";
import { AddHotelModel } from "../../domain/model/hotel";
import { HotelService } from "../services/hotel-service";
import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { NotFoundError } from "../../@shared/errors/not-found-error";

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
