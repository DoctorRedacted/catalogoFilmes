import { connect } from "./connection.js"

export async function inserirfilme(filme) {
    const comando =
        ` INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                      VALUES (?, ?, ?, ?, ?, ?)`
    const [resposta] = await connect.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = resposta.insertId;

    return filme;
}

export async function alterarimagem(imagem, id) {
    const comando =
        `UPDATE tb_filme
         SET   img_filme     = ?
         WHERE id_filme      = ? `;
    
    const [retorno] = await connect.query(comando, [imagem, id]);
    return retorno.affectedRows;
}

export async function listarfilmes() {
    const comando = `SELECT id_filme			id,
                            nm_filme			nome,
                            vl_avaliacao		avaliacao,
                            dt_lancamento	    lancamento,
                            bt_disponivel	    disponivel
                       FROM tb_filme`;
    const [linhas] = await connect.query(comando);
    return linhas;
}

export async function filtroId(id) {
    const comando = `SELECT id_filme			id,
                            nm_filme			nome,
                            ds_sinopse          sinopse,
                            img_filme           image,
                            vl_avaliacao		avaliacao,
                            dt_lancamento	    lancamento,
                            bt_disponivel	    disponivel,
                            id_usuario          usuario
                       FROM tb_filme
                      WHERE id_filme = ?`;
    const [linhas] = await connect.query(comando, [id]);
    return linhas[0];
}


export async function filtronome(nome) {
    const comando = `SELECT id_filme			id,
                            nm_filme			nome,
                            vl_avaliacao		avaliacao,
                            dt_lancamento	    lancamento,
                            bt_disponivel	    disponivel
                            FROM tb_filme
                            WHERE nm_filme like ?`;
    const [linhas] = await connect.query(comando, [`%${nome}%`]);
    return linhas;
} 


export async function removerfilme(id) {
    const comando =`DELETE FROM tb_filme 
                           WHERE id_filme = ?`;
    
    const [resposta] = await connect.query(comando, [id]);
    return resposta.affectedRows;
}

export async function alterarFilme(id, filme) {
    const comando =
        `UPDATE tb_filme 
         SET    nm_filme        = ?,
                ds_sinopse      = ?,
                vl_avaliacao    = ?,
                dt_lancamento   = ?,
                bt_disponivel   = ?
         WHERE  id_filme        = ?`;
    
    const [resposta] = await connect.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id])
    return resposta.affectedRows;
}