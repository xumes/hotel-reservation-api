import { Router } from "express";
import { AddHotelController } from "../controllers/add-hotel-controller";
import { container } from "../container";
import { AddRoomController } from "../controllers/add-room-controller";
import { GetHotelController } from "../controllers/get-hotel-controller";
import { GetAllHotelController } from "../controllers/get-all-hotel-controller";

const hotelService = container.getHotelService();
const roomService = container.getRoomservice();

const addHotelController = new AddHotelController(hotelService);
const addRoomController = new AddRoomController(roomService);
const getHotelController = new GetHotelController(hotelService);
const getAllHotelController = new GetAllHotelController(hotelService);

const router = Router();

router.post("/hotels", addHotelController.handle.bind(addHotelController));
router.post(
  "/hotels/:hotelId/rooms",
  addRoomController.handle.bind(addRoomController)
);
router.get(
  "/hotels/:hotelId",
  getHotelController.handle.bind(getHotelController)
);
router.get(
  "/hotels/",
  getAllHotelController.handle.bind(getAllHotelController)
);

export { router };
