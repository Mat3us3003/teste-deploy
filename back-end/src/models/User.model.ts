import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import User from "../entities/User";

class UserModel {
    public static async _selectAll() {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            return users;
        } catch (error) {
            return error;
        }
    }

    public static async _selectBy(query: object) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const userData = await userRepository.findOneBy(query);
            return userData;
        } catch (error) {
            return error;
        }
    }
    

    public static async _insert(user: User) {
        const userRepository = AppDataSource.getRepository(User);

        const [existentUser] = await userRepository.find({
            where: [
                { email: user.email },
                { cpf: user.cpf }
            ]
        });

        if(existentUser) {
            return Functions.importReturn([], true, {
                message: "Usuário com cpf ou email já existente!"
            });
        }

        try {
            const insertUserValues = await userRepository.insert(user);
            return Functions.insertReturn(insertUserValues, false, {});
        } catch (error) {
            return error;
        }
    }

    public static async _update(id: number, columns: object) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({
                id_user: id
            });
            
            const updateUser = await userRepository.update(id, columns);
            return updateUser;
        } catch (error) {
            return error;
        }
    }
    

    public static async _deleteById(id: number) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const deleteUser = userRepository.delete(id);
            return deleteUser;
        } catch (error) {
            return error;
        }
    }

}

export default UserModel;