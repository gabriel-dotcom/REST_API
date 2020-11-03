// ARQUIVO ONDE FICARA AS ROTAS - OPERAÇÕES CRUD

const express = require('express');
const router = express.Router();

const db = require('../database/index').pool; // Pegando o pool do arquivo de configuração do db


// RETORNAR MAQUINAS
router.get('/', (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) throw error;
        conn.query(
            'SELECT * FROM maquinas',
            (error, resultado, field) => {
                if(error) { return res.status(500).send({ error: error }) }
                if(resultado.length == 0){ return res.status(201).send({ mensagem: "Nenhuma máquina foi encontrada" }) }
                // DOCUMENTANDO A API //
                const response = {
                    quantidade: resultado.length,
                    maquina: resultado.map(maq => {
                        return {
                            id_maquina: maq.id_maquina,
                            nome: maq.nome,
                            provisionador: maq.provisionador,
                            cliente: maq.cliente,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna valores',
                                url: 'http://localhost:3000/maquinas/' + resultado.id_maquina
                            }
                        }
                    })
                }
                return res.status(201).send({ maquina: response });
            }
        )
    });
});

// INSERIR MAQUINAS
router.post('/', (req, res, next) => {
    // CONEXÃO COM DB
    db.getConnection((error, conn) => {
        if (error) throw error;
        conn.query(
            'INSERT INTO maquinas(nome, provisionador, cliente) VALUES(?, ?, ?)',
            [
                req.body.nome, 
                req.body.provisionador, 
                req.body.cliente
            ],
            (error, resultado, field) => {
                conn.release();
                if (error){ res.status(500).send({ error: error } ); }
                const response = {
                    mensagem: "Máquina inserida",
                    maquina: {
                            id_maquina: resultado.insertId,
                            nome: req.body.nome,
                            provisionador: req.body.provisionador,
                            cliente: req.body.cliente,
                            request: {
                                tipo: 'POST',
                                descricao: 'Insere máquinas',
                                url: 'http://localhost:3000/maquinas/' + resultado.insertId
                            }
                    }    
                }
                return res.status(201).send({ maquina: response });
            }
        );
    });
});

// ALTERANDO MAQUINA
router.patch('/', (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) throw error;
        conn.query(
            'UPDATE maquinas SET nome=?, provisionador=?, cliente=? WHERE id = ?',
            [
                req.body.nome, 
                req.body.provisionador, 
                req.body.cliente,
                req.body.id_maquina
            ],
            (error, result, field) => {
                conn.release();
                if (error){ return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: "Máquina alterada",
                    maquina: {
                            nome: req.body.nome,
                            provisionador: req.body.provisionador,
                            cliente: req.body.cliente,
                            request: {
                                tipo: 'PATCH',
                                descricao: 'Altera máquinas',
                                url: 'http://localhost:3000/maquinas/' + req.body.id_maquina
                            }
                    }    
                }
                return res.status(201).send({ maquina: response });
            }
        );
    });
});

// DELETAR MAQUINA
router.delete('/', (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) throw error;
        conn.query(
            'DELETE FROM maquinas WHERE id=?',
            [
                req.body.id_maquina
            ],
            (error, resultado, field) => {
                conn.release();
                if (error){ res.status(500).send({ error: error }); }
                res.status(201).send({ mensagem: 'Maquina deletada' });
            }
        );
    });
});

module.exports = router;