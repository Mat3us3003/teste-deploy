import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import Equipament from "../entities/Equipament";
import Request from "../entities/Request";

class EquipamentModel {
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
    
    public static async _insert(equipament: Equipament[] | Equipament) {
        const equipamentRepository = AppDataSource.getRepository(Equipament);

        try {
            const insertEquipamentValues = await equipamentRepository.insert(equipament);
            return Functions.insertReturn(insertEquipamentValues, false, {});
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

export default EquipamentModel;