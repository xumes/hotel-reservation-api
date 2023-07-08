import { Router } from "express";
import { AddHotelController } from "../controllers/add-hotel-controller";
import { container } from "../container";

const hotelService = container.getHotelService();

const addHotelController = new AddHotelController(hotelService);

const router = Router();

router.post("/hotels", addHotelController.handle.bind(addHotelController));

export { router };
