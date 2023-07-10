import { Request, Response } from "express";
import { RoomService } from "../services/room-service";
import {
  AddRoomModel,
  AddRoomProps,
  RoomStatus,
} from "../../domain/model/room";
import { InvalidParamError } from "../../@shared/errors/invalid-param-error";
import { MissingParamError } from "../../@shared/errors/missing-param-error";
import { NotFoundError } from "../../@shared/errors/not-found-error";

export class AddRoomController {
  private roomService: RoomService;

  constructor(roomService: RoomService) {
    this.roomService = roomService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { number, price, status } = req.body as AddRoomProps;
      const { hotelId } = req.params;

      const roomStatus = status || "AVAILABLE";

      const addRoomModel: AddRoomModel = {
        number: number,
        price: price,
        status: roomStatus as RoomStatus,
        hotelId: hotelId,
      };

      const room = await this.roomService.create(addRoomModel);

      res.status(201).json(room);
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
