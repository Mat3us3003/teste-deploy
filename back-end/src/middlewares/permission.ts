import { NextFunction } from "express";

const hasPermission = async (req: any, res: any, next: NextFunction, permission: Array<string>) => {
    if(!req.id_user)
        return res.status(401).json({'error': 'Erro na validação de permissão'});

    if(permission.includes(req.type_user)) 
        next();
    else 
        return res.status(401).json({'error': 'O usuário não tem a permissão necessária'});   
}

export default hasPermission;