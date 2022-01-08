import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export default function(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(400).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
        return response.status(401).send({ error: 'Token error' });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return response.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decoded: any) => {
        if (err) return response.status(401).send({ error: 'Token invalid'})
        request.headers.userId = decoded.id;
        return next();
    })
}