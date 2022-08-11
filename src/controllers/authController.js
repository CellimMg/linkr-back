import { create } from "../repository/authRepository.js";
import bcrypt from "bcrypt";

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