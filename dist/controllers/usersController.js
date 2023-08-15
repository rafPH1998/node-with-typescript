"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const index = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    return response.status(200).json({ data: users });
});
const show = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = request.params;
    const user = yield user_1.default.findByPk(idUser);
    if (!user) {
        return response.status(404).json({ error: "Usuario nao encontrado" });
    }
    return response.status(200).json(user);
});
const store = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const name = request.body.name;
    const email = request.body.email;
    if (!name || name === '') {
        return response.status(400).json({ error: "Campo nome é obrigatório." });
    }
    if (!email || email === '') {
        return response.status(400).json({ error: "Campo de e-mail é obrigatório." });
    }
    try {
        const existsEmail = yield user_1.default.findOne({ where: { email: email } });
        if (existsEmail) {
            return response.status(400).json({ error: "Já existe um usuário com esse e-mail!" });
        }
        const user = yield user_1.default.create(request.body);
        return response.status(201).json(user);
    }
    catch (error) {
        return response.status(500).json({ error: "Erro ao cadastrar um novo usuário" });
    }
});
const destroy = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = request.params.idUser;
    try {
        const user = yield user_1.default.findByPk(idUser);
        if (!user) {
            return response.status(404).json({ error: 'Id do usuário não encontrado!' });
        }
        yield user.destroy(); // Aguarde a conclusão da exclusão
    }
    catch (error) {
        return response.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});
exports.default = {
    index,
    store,
    show,
    destroy
};
//# sourceMappingURL=usersController.js.map