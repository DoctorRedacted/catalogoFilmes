import "dotenv/config"
import usuariocontroller from "./controller/usuarioController.js"
import filmecontroller from "./controller/filmeController.js"

import express from "express"
import cors from "cors"

const server = express();
server.use(cors());
server.use(express.json());

// liberar arquivos da storage

server.use('/storage/capasFilmes', express.static('storage/capasFilmes'));
//configuraçã dos endpoints
server.use(usuariocontroller);
server.use(filmecontroller);

server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`))
