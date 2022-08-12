import { create, read } from "../repository/authRepository.js";
import { create as createSession, read as readSession, update as updateSession } from "../repository/sessionsRepository.js";
import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function signUp(req, res) {
    try {
        const body = req.body;
        const password = bcrypt.hashSync(body.password, 8);
        const data = {
            ...body,
            password
        }

        await create(data);
        return res.status(201).send({ message: "Usuario criado com sucesso!" });
    } catch (error) {
        switch (error) {
            case "EMAIL_EXISTS":
                return res.status(409).send({ message: "O email informado já está cadastrado!" });
            default:
                return res.sendStatus(500);
        }
    }
}

export async function signIn(req, res) {
    try {
        const body = req.body;

        const response = (await read(body))[0];
        if (!response) return res.status(401).send({ message: "E-mail e/ou senha incorretos!" });

        const validPassword = bcrypt.compareSync(body.password, response.password);

        if (!validPassword) return res.status(401).send({ message: "E-mail e/ou senha incorretos!" });
        delete response.password;

        const token = generateToken(response);
        const userSession = (await readSession(response.id))[0];

        console.log(userSession);
        if (!userSession) await createSession({ userId: response.id, token });
        else await updateSession(token, response.id);

        return res.status(201).send({ ...response, token });
    } catch (error) {
        switch (error) {
            case "EMAIL_NOT_FOUND":
                return res.status(401).send({ message: "E-mail e/ou senha incorretos!" });
            default:
                return res.sendStatus(500);
        }
    }
}

function generateToken(user) {
    const token = sign({
        userId: user.id
    }, process.env.JWT_KEY);
    return token;
}
