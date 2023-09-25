import AppDataSource from "../dataSource";
import Departament from "../entities/Departament";

class DepartamentModel{
    public static async _selectAll(){
        try{
            const departamentRepository = AppDataSource.getRepository(Departament);
            const departaments = await departamentRepository.find();
            return departaments;
        } catch(error){
            return error;
        }
    }
    
    public static async _selectBy(query: object){
        try{
            const departamentRepository = AppDataSource.getRepository(Departament);
            const departamentData = await departamentRepository.findOneBy(query);
            return departamentData;
        } catch(error){
            return error;
        }
    }
}

export default DepartamentModel;