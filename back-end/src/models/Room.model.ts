import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import Room from "../entities/Room";

class RoomModel {
    public static async _selectAll() {
        try{
            const roomRepository = AppDataSource.getRepository(Room);
            const rooms = await roomRepository.find();
            return rooms;
        } catch(error){
            return error;
        }
    }
    
    public static async _selectBy(query: object) {
        try{
            const roomRepository = AppDataSource.getRepository(Room);
            const roomData = await roomRepository.findOneBy(query);
            return roomData;
        } catch(error){
            return error;
        }
    }

    public static async _selectAllBy(type: string) {
        try {
            const roomRepository = AppDataSource.getRepository(Room);
            const roomData = await roomRepository.find({
                where: {type: type}
            });
            return roomData;
        } catch (error) {
            return error;
        }
    }

    public static async _selectByNameOrLocation(searchString: string) {
        try{
            const roomRepository = AppDataSource.getRepository(Room);
            const rooms = await roomRepository
                .createQueryBuilder("room")
                .where("room.name LIKE :search", { search: `%${searchString}%` })
                .orWhere("room.location LIKE :search", { search: `%${searchString}%` })
                .getMany();
            return rooms;
        } catch(error){
            return error;
        }
    }
    

    public static async _insert(room: Room) {
        const roomRepository = AppDataSource.getRepository(Room);
        try {
            const insertRoomValues = await roomRepository.insert(room);
            return Functions.insertReturn(insertRoomValues, false, {});
        } catch (error) {
            return error;
        }
    }

    public static async _update(id: number, columns: object) {
        try {
            const roomRepository = AppDataSource.getRepository(Room);
            const roomExistent = await roomRepository.findOneBy({
                id_room: id
            });
            
            if(roomExistent) {
                const updateRoom = await roomRepository.update(id, columns);
                return updateRoom;
            }
            return;
        } catch (error) {
            return error;
        }
    }

    public static async _deleteById(id: number) {
        const roomRepository = AppDataSource.getRepository(Room);
        try {
            const deleteRoom = await roomRepository.delete(id);
            return deleteRoom;
        } catch (error) {
            return error;
        }
    }
}

export default RoomModel;