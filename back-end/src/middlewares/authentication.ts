const jwt = require('jsonwebtoken');

const authMiddleware = async (req: any, res: any, next: any) => {
    const authHeader: any = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 'error': 'Token de autenticação inválido' });
    }
    
    const path = authHeader.split(' ');
    
    if (path.length != 2) {
        return res.status(401).json({ 'error': 'Token em um formato inválido' });
    }

    const [ scheme, token ] = path;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ 'error': 'Token em um formato inválido' });
    }

    await jwt.verify(token, process.env.PRIVATE_KEY_TOKEN ? process.env.PRIVATE_KEY_TOKEN : '8-2jU-$7V7b5-6A5N5w8$N2Jn-$V7-5$N-8vAn5nNy5Y5a$-B8X3$4ALH1Q9M24BSRWTP8J6YJ5FKO7VE0G' as string, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ 'error': 'Token inválido' });
        }

        if (!decoded) {
            return res.status(401).json({ 'error': 'Erro na validação' });
        }

        req.id_user = decoded.id_user as string;
        req.type_user = decoded.type as string;
        return next();
    });
};

export default authMiddleware;