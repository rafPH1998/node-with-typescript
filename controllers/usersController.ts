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

    const { body } = request

    try {
        const existsEmail = await User.findOne({ where: {email: body.email}})

        if (existsEmail) {
            return response.status(400).json({error: "Já existe um usuário com esse e-mail!"});
        }

        const user = await User.create(request.body);
        return response.status(201).json(user);

    } catch (error) {
        return response.status(500).json({error: "Erro ao cadastrar um novo usuário"});
    }
}

const update = (request: Request, response: Response) => {

    const { id } = request.params;
    const { body } = request;


    response.json({
        msg: "update USER",
        body
    })
}

const destroy = async (request: Request, response: Response) => {
    const { idUser } = request.params;

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
    update,
    destroy
}