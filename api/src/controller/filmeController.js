import { alterarFilme, alterarimagem, filtroId, filtronome, inserirfilme, listarfilmes, removerfilme} from '../repository/filmeRepository.js'
import multer from "multer"
import { Router } from 'express'
import { connect } from '../repository/connection.js';

const server = Router();
const upload = multer({ dest: 'storage/capasFilmes'});


server.post('/filme', async(req, resp) => {
    try {
        const novofilme = req.body;

        if (!novofilme.nome) throw new Error('Nome do filme é obrigatório');
        if (!novofilme.sinopse) throw new Error('Sinopse do filme é obrigatório');
        if (novofilme.avaliacao === undefined || novofilme.avaliacao < 0) throw new Error('Avaliacao do filme é obrigatório');
        if (!novofilme.lancamento) throw new Error('Lancamento do filme é obrigatório');
        if (!novofilme.disponivel) throw new Error('Disponibilidade do filme é obrigatório');
        if (!novofilme.usuario) throw new Error('Usuario não logado');

        const filmeInserido = await inserirfilme(novofilme);
        resp.send(filmeInserido);
    } catch (err) {
        resp.status(404).send({erro: err.message})
    }
})

server.put('/filme/:id/capa', upload.single('capa') , async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;
        const resposta = await alterarimagem(imagem, id);
        if (resposta != 1)
            throw new Error('A imagem não pôde ser salva');
        
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/filme', async (req, resp) => {
    try {
        const resposta = await listarfilmes();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme/busca', async (req, resp) => {
    try {
        const { nome } = req.query;
        const resposta = await filtronome(nome);
        if (nome.length == 0) {
            //throw new Error('Filme não encontrado');
            resp.status(404).send({ mensagem: 'Não foi possível encontrar o item solicitado' })
        } else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})



server.get('/filme/:id', async (req, resp) => {
    try {
        const id =  Number(req.params.id);
        const resposta = await filtroId(id);
        if (!resposta) {
            //throw new Error('Filme não encontrado');
            resp.status(404).send({ mensagem: 'Não foi possível encontrar o item solicitado' })
        } else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await removerfilme(id);
        if (resposta != 1) {
            throw new Error('Filme não pôde ser removido')
        } else {
            resp.status(204).send();
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;

        if (!filme.nome) throw new Error('Nome do filme é obrigatório');
        if (!filme.sinopse) throw new Error('Sinopse do filme é obrigatório');
        if (filme.avaliacao === undefined || filme.avaliacao < 0) throw new Error('Avaliacao do filme é obrigatório');
        if (!filme.lancamento) throw new Error('Lancamento do filme é obrigatório');
        if (filme.disponivel == undefined) throw new Error('Disponibilidade do filme é obrigatório');
        if (!filme.usuario) throw new Error('Usuario não logado');

        const resposta = await alterarFilme(id, filme);
        if (resposta != 1) {
            throw new Error('Filme não pôde ser alterado');
        } else {
            resp.status(204).send();
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
}) 


export default server;