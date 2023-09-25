import { NextFunction, Request, Response } from "express";
import RoomModel from "../models/Room.model";
import Room from "../entities/Room";
import AuthorizerModel from "../models/Authorizer.model";
import Authorizer from "../entities/Authorizer";
import Equipament from "../entities/Equipament";
import EquipamentModel from "../models/Equipament.model";
import EquipamentType from "../types/EquipmentType";

class RoomController {
    public static async selectRoom(req: Request, res: Response, next: NextFunction): Promise<any> {
        const idRoom = req.params.id;

        try {
            const data: any = await RoomModel._selectBy({id_room: idRoom});
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    public static async insertRoom(req: any, res: Response, next: NextFunction): Promise<any> {
        const body: any = req.body;
        const id_user: any = req.id_user;
        const equipaments: EquipamentType[] = req.body.equipments;

        const room: Room = new Room(); 
        room.name = body.name;
        room.capacity = body.capacity;
        room.type = body.type;
        room.especificity = body.especifity;
        room.location = body.location;
        
        try {
            const data: any = await RoomModel._insert(room);
            const id_room: any = data.insert_values.identifiers[0].id_room;
    
            const authorizer: Authorizer = new Authorizer();
            authorizer.room = id_room;
            authorizer.user = id_user;
    
            await AuthorizerModel._insert(authorizer);

            equipaments.forEach(async (value) => {
                const equipaments: Equipament[] = [];

                for(let i = 0; i < value.quantity; i++) {
                  const equipament: Equipament = new Equipament();
                  equipament.name = value.name;
                  equipament.room = id_room;
                  equipament.status = "OPERANTE";

                  equipaments.push(equipament);
                }
                await EquipamentModel._insert(equipaments);
              });

            return res.status(201).json({message: 'Sala criada e autorizador definido!'});
    
        } catch (error) {
            return res.status(400).json({message: 'Erro ao definir autorizador ou adicionar sala'});
        }
    }
    
    public static async filterRoomsByType(req: Request, res: Response, next: NextFunction): Promise<any> {
        const type: string = req.params.type;

        try {
            const data: any = await RoomModel._selectAllBy(type);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    public static async searchRooms(req: Request, res: Response, next: NextFunction): Promise<any> {
        const searchText: string = req.params.search;

        try {
            const data: any = await RoomModel._selectByNameOrLocation(searchText);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default RoomController;