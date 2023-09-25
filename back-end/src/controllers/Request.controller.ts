import { NextFunction, Response } from "express";
import RequestModel from "../models/Request.model";

class RequestController {
    public static async selectByUser(req: any, res: Response, next: NextFunction): Promise<any> {
        const userId: String = req.id_user;
        
        try {
            const requests = await RequestModel._selectBy({
                where: {
                    user: { id_user: userId }
                },
                relations: {
                    user: true,
                    room: true
                }
            });
            return res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }    

    public static async selectAll(req: any, res: Response, next: NextFunction): Promise<any> {
        // Pega todos os usuários do banco de dados
        try {
            const requests = await RequestModel._selectAll();

            return res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }

    public static async selectByAuthorizer(req: any, res: Response, next: NextFunction): Promise<any> {
        const userId: string = req.id_user;

        try {
            const requests = await RequestModel._selectByAuthorizer(+userId);
            return res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }

    public static async update(req: any, res: Response, next: NextFunction): Promise<any> {
        const requestData: any = req.body;

        try {
            const requestUpdate = await RequestModel._update(requestData.id_request, requestData);
            
            return res.status(200).json("Requisição alterado com sucesso.")
        } catch (error) {
            next(error);
        }
    }
}

export default RequestController;