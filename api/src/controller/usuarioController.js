import { login } from "../repository/usuarioRepository.js"
import { Router } from "express"
const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const retorno = await login(email, senha);
        if (!retorno) {
            throw new Error('Invalid credentials');
        }
        resp.send(retorno);
    } catch(err) {
        resp.status(401).send({erro:"An error ocurred, because " + err.message})
    }
});

export default server;