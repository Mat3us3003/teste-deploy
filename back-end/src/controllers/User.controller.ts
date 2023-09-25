import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";
import User from "../entities/User";
import Functions from "../core/Functions";
import Auth from "../core/Auth";
import errorResponse from "../types/errorResponse";
import error from "../core/error";

class UserController {
    public static async insert(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userInfo: any = req.body;

        const user: User = new User();

        // Verificações dos campos obrigatórios

        // Campo name
        if(userInfo.name == null) {
            return res.status(400).json(Functions.insertReturn([], true, {
                message: 'Não há nenhuma informação no campo "Nome".'
            }));
        }

        // Campo cpf
        if(userInfo.cpf == null) {
            return res.status(400).json(Functions.insertReturn([], true, {
                message: 'Não há nenhuma informação no campo "CPF".'
            }));
        }

        // Campo email
        if(userInfo.email == null) {
            return res.status(400).json(Functions.insertReturn([], true, {
                message: 'Não há nenhuma informação no campo "Email".'
            }));
        }

        // Campo senha
        if(userInfo.password == null) {
            return res.status(400).json(Functions.insertReturn([], true, {
                message: 'Não há nenhuma informação no campo "Senha".'
            }));
        }

        const { hash, salt }: any = Auth.encryptPassword(userInfo.password.toLowerCase());

        user.name = userInfo.name;
        user.email = userInfo.email;
        user.cpf = userInfo.cpf;
        user.password = hash;
        user.salt = salt;
        user.type = userInfo.type == null ? "Normal" : userInfo.type;

        try {
            await UserModel._insert(user)
                            .then(data => {
                                return res.status(201).json(data);
                            }).catch(error => {
                                return res.status(400).json(error)
                            });
        } catch (error) {
            next(error);
        }
    }

    public static async select(req: Request, res: Response, next: NextFunction): Promise<any> {
        // Pega todos os usuários do banco de dados
        try {
            const users = await UserModel._selectAll();

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    public static async update(req: any, res: Response, next: NextFunction): Promise<any> {
        const userData: any = req.body;
        const userId: any = req.id_user;

        try {
            if(userData.password) {
                const { hash, salt }: any = Auth.encryptPassword(userData.password.toLowerCase());
                userData.password = hash;
                userData.salt = salt;
            }

            const userUpdate = await UserModel._update(userId, userData);
            
            return res.status(200).json("Usuário alterado com sucesso.")
        } catch (error) {
            next(error);
        }
    }

    public static async updateById(req: any, res: Response, next: NextFunction): Promise<any> {
        const userData: any = req.body;
        const userId: any = req.params.id;

        try {
            if(userData.password) {
                const { hash, salt }: any = Auth.encryptPassword(userData.password.toLowerCase());
                userData.password = hash;
                userData.salt = salt;
            }

            const userUpdate = await UserModel._update(userId, userData);
            
            return res.status(200).json("Usuário alterado com sucesso.")
        } catch (error) {
            next(error);
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId: String = req.params.id;
        
        try {
            const userDelete = await UserModel._deleteById(+userId);
            return res.status(200).json("Usuário deletado com sucesso.");
        } catch (error) {
            next(error);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userInfo: any = req.body;

        const userInfoMissingData: errorResponse = {
            errorCode: error.e400.MISSINGINFORMATION[0],
            errorMessage: error.e400.MISSINGINFORMATION[1],
            customMessage: ''
        };

        const userInfoWrong: errorResponse = {
            errorCode: error.e400.INCORRECTINFORMATION[0],
            errorMessage: error.e400.INCORRECTINFORMATION[1],
            customMessage: ''
        };

        try {
            if(userInfo.email == null) {
                userInfoMissingData.customMessage = 'Email não inserido!';
                return res.status(401).json(userInfoMissingData);
            }

            if(userInfo.password == null) {
                userInfoMissingData.customMessage = 'Senha não inserida';
                return res.status(401).json(userInfoMissingData);
            }

            await UserModel._selectBy({email: userInfo.email})
                            .then((user: any) => {
                                if(user.length == 0) {
                                    userInfoWrong.customMessage = 'Email incorreto!';
                                    return res.status(401).json(userInfoWrong);
                                }

                                const isPasswordCorrect: boolean = Auth.comparePasswords(userInfo.password, user.salt, user.password);

                                if(isPasswordCorrect) {
                                    const token = Auth.createToken({
                                        id_user: user.id_user,
                                        type: user.type
                                    });

                                    return res.status(200).json({
                                        logado: true,
                                        token: token,
                                        type: user.type
                                    })
                                } else {
                                    userInfoWrong.customMessage = 'Senha incorreta!';
                                    return res.status(401).json(userInfoWrong);
                                }
                            }).catch(error => { throw error;});
        } catch (error) {
            next(error);
        }
    }

    public static async getDataById(req: any, res: Response, next: NextFunction): Promise<any> {
        const userId: string = req.id_user;

        try {
            const userData = await UserModel._selectBy({id_user: userId});
            return res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    public static async logged(req: Request, res: Response, next: NextFunction): Promise<any> {
        const authHeader: any = req.headers.authorization;

        try {
            if(authHeader === null) {
                return res.status(400).json({
                    message: 'Token não informado.'
                });
            }

            const path: Array<string> = authHeader.split(' ');

            if(path.length != 2) {
                return res.status(400).json({
                    message: 'Token em um formato inválido.'
                });
            }

            const [ scheme, token ] = path;

            if (!/^Bearer$/i.test(scheme) || token.split('.').length != 3) {
                return res.status(400).json({
                    message: 'Token não é valido'
                });
            }

            const payload = Auth.checkToken(token);

            if (!payload) {
                return res.status(400).json({
                    message: 'Token não é valido'
                });
            }

            const result: any = await UserModel._selectBy({id_user: payload.id_user}).catch(error => { return res.status(500).json(error) });
            
            if(!result) {
                return res.status(400).json({
                    message: 'Token inválido. Usuário não encontrado.'
                });
            }

            return res.status(200).json({
                isLogged: true
            });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;