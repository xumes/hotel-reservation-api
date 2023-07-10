import { Router } from "express";
import { AddHotelController } from "../controllers/add-hotel-controller";
import { container } from "../container";
import { AddRoomController } from "../controllers/add-room-controller";

const hotelService = container.getHotelService();
const roomService = container.getRoomservice();

const addHotelController = new AddHotelController(hotelService);
const addRoomController = new AddRoomController(roomService);

const router = Router();

router.post("/hotels", addHotelController.handle.bind(addHotelController));
router.post(
  "/hotels/:hotelId/rooms",
  addRoomController.handle.bind(addRoomController)
);

export { router };
