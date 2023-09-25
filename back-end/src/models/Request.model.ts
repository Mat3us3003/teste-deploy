import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import Request from "../entities/Request";

class RequestModel {
    public static async _selectAll(){
        const requestRepository = AppDataSource.getRepository(Request);

        try{
            const requests = await requestRepository.find();
            return requests;
        } catch(error){
            return error;
        }
    }

    public static async _selectBy(query: object){
        const requestRepository = AppDataSource.getRepository(Request);

        try{
            const requestData = await requestRepository.find(query);
            return requestData;
        } catch(error){
            return error;
        }
    }

    public static async _selectByAuthorizer(id: number) {
        const requestRepository = AppDataSource.getRepository(Request);
        
        try {
            const requests = await requestRepository.createQueryBuilder("r")
                                                    .select("r.*")
                                                    .addSelect("a.id_user_fk")
                                                    .addSelect("room.name")
                                                    .addSelect("user.name")
                                                    .leftJoin("authorizer", "a", "r.id_room_fk = a.id_room_fk")
                                                    .leftJoin("room", "room", "r.id_room_fk = room.id_room")
                                                    .leftJoin("user", "user", "r.id_user_fk = user.id_user")
                                                    .where("a.id_user_fk = :userId", {userId: id})
                                                    .getRawMany();                                                    
            return requests;
        } catch(error) {
            return error
        }
    }
    
    public static async _insert(request: Request) {
        const requestRepository = AppDataSource.getRepository(Request);

        try {
            const insertRequestValues = await requestRepository.insert(request);
            return Functions.insertReturn(insertRequestValues, false, {});
        } catch (error) {
            return error;
        }
    }

    public static async _update(id: number, columns: object) {
        try {
            const requestRepository = AppDataSource.getRepository(Request);
            const requestExistent = await requestRepository.findOneBy({
                id_request: id
            });
            
            if(requestExistent) {
                const updateRequest = await requestRepository.update(id, columns);
                return updateRequest;
            }
            return;
        } catch (error) {
            return error;
        }
    }

    public static async _deleteById(id: number) {
        const requestRepository = AppDataSource.getRepository(Request);

        try {
            const deleteRequest = await requestRepository.delete(id);
            return deleteRequest;
        } catch (error) {
            return error;
        }
    }
}

export default RequestModel;