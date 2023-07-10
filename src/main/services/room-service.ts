import { RoomRepository } from "../../data/repositories/room-repository";
import { AddRoomModel, RoomModel } from "../../domain/model/room";
import { AddRoomUsecase } from "../../domain/usecases/add-room";

export class RoomService {
    private roomRepository: RoomRepository
    private addRoomUsecase: AddRoomUsecase

    constructor (roomRepository: RoomRepository) {
        this.roomRepository = roomRepository

        this.addRoomUsecase = new AddRoomUsecase()
    }

    async create(roomPropos: AddRoomModel): Promise<RoomModel> {
        const room = this.addRoomUsecase.execute(roomPropos)

        return this.roomRepository.create(room)
    }
}

