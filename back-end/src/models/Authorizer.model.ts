import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import Authorizer from "../entities/Authorizer";

class AuthorizerModel {
    public static async _selectAll(){
        const authorizerRepository = AppDataSource.getRepository(Authorizer);

        try{
            const authorizers = await authorizerRepository.find();
            return authorizers;
        } catch(error){
            return error;
        }
    }

    public static async _selectBy(query: object){
        const authorizerRepository = AppDataSource.getRepository(Authorizer);

        try{
            const authorizerData = await authorizerRepository.find(query);
            return authorizerData;
        } catch(error){
            return error;
        }
    }
    
    public static async _insert(authorizer: Authorizer) {
        const authorizerRepository = AppDataSource.getRepository(Authorizer);

        try {
            const insertauthorizerValues = await authorizerRepository.insert(authorizer);
            return Functions.insertReturn(insertauthorizerValues, false, {});
        } catch (error) {
            return error;
        }
    }

    public static async _update(id: number, columns: object) {
        try {
            const authorizerRepository = AppDataSource.getRepository(Authorizer);
            const authorizerExistent = await authorizerRepository.findOneBy({
                id_authorizer: id
            });
            
            if(authorizerExistent) {
                const updateauthorizer = await authorizerRepository.update(id, columns);
                return updateauthorizer;
            }
            return;
        } catch (error) {
            return error;
        }
    }

    public static async _deleteById(id: number) {
        const authorizerRepository = AppDataSource.getRepository(Authorizer);

        try {
            const deleteauthorizer = await authorizerRepository.delete(id);
            return deleteauthorizer;
        } catch (error) {
            return error;
        }
    }
}

export default AuthorizerModel;