import { Request, Response } from "express";
import { RoomService } from "../services/room-service";
import {
  AddRoomModel,
  AddRoomProps,
  RoomStatus,
} from "../../domain/model/room";

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
      // TODO: Handle the erros here
      console.log(err);
      res.status(500).end();
    }
  }
}
