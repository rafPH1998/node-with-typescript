import { Request, Response } from "express";
import User from "../models/user";

const index = async (request: Request, response: Response) => {
    const users = await User.findAll();
    return response.status(200).json({data: users});
}

const show = async (request: Request, response: Response) => {
    const { idUser } = request.params;
    const user = await User.findByPk(idUser);

    if (!user) {
        return response.status(404).json({error: "Usuario nao encontrado"});
    }
  
    return response.status(200).json(user);
}

const store = async (request: Request, response: Response) => {

    const name: string = request.body.name
    const email: string = request.body.email

    if (!name || name === '') {
        return response.status(400).json({ error: "Campo nome é obrigatório." });
    }

    if (!email || email === '') {
        return response.status(400).json({ error: "Campo de e-mail é obrigatório." });
    }

    try {
        const existsEmail = await User.findOne({ where: {email: email}})

        if (existsEmail) {
            return response.status(400).json({error: "Já existe um usuário com esse e-mail!"});
        }

        const user = await User.create(request.body);
        return response.status(201).json(user);

    } catch (error) {
        return response.status(500).json({error: "Erro ao cadastrar um novo usuário"});
    }
}

const destroy = async (request: Request, response: Response) => {
    const idUser: string = request.params.idUser;

    try {
        const user = await User.findByPk(idUser);

        if (!user) {
            return response.status(404).json({ error: 'Id do usuário não encontrado!' });
        }

        await user.destroy(); // Aguarde a conclusão da exclusão

    } catch (error) {
        return response.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
}


export default {
    index,
    store,
    show,
    destroy
}