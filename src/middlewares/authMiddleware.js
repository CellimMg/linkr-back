import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

export function tokenValidation(req, res, next) {
    try {
        const auth = req.headers.authorization;
        const [, token] = auth.split(" ");
        if (!token) return res.status(401).send({ message: "Token inválido!" });

        verify(token, process.env.JWT_KEY);

        next();
    } catch (error) {
        return res.status(401).send({ message: "Token inválido!" });
    }
}