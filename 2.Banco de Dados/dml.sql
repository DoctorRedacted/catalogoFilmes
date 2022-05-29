SELECT id_filme        id,
	   nm_filme        nome,
       vl_avaliacao    valiacao,
       dt_lancamento   lancamento,
       bt_disponivel   disponivel
  FROM tb_filme
 WHERE nm_filme        like "%a%";
 
 -- CSU07:: consultar filmes por id
 SELECT id_filme        id,
		nm_filme        nome,
        vl_avaliacao    valiacao,
        ds_sinopse      sinopse,
        dt_lancamento   lancamento,
        bt_disponivel   disponivel
  FROM  tb_filme
  WHERE id_filme        = 1;