"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json");

/**
 * Função para retorna a lista de jogadores da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getJogadores(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM jogador";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela jogador" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "jogadoresDB": rows });
        }
    });
}
module.exports.getJogadores = getJogadores;

/**
 * Função que permite remover um jogador
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function removerJogador(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("DELETE FROM jogador WHERE id=?", [Number(req.params.id)]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removerJogador = removerJogador;

/**
 * Permite criar ou editar um jogador
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateJogador(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let nome = req.body.nome;
    let dataNascimento = req.body.dataNascimento;
    let localidadeId = Number(req.body.localidade);
    let generoId = Number(req.body.genero);
    let modalidadeId = Number(req.body.modalidade);
    let sql;
    if (req.method === "POST") {
        sql = mysql.format("INSERT INTO jogador (nome, dataNascimento, localidadeId, generoId,modalidadeId) VALUES(?,?,?,?,?)",
            [nome, dataNascimento, localidadeId, generoId, modalidadeId]);
    } else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE jogador SET nome=?, dataNascimento=?, localidadeId=?, generoId=?, modalidadeId=? WHERE id=?",
                [nome, dataNascimento, localidadeId, generoId, modalidadeId, Number(req.params.id)]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUpdateJogador = createUpdateJogador;


/**
 * Função para retorna a lista de localidades da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getLocalidades(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM localidade";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela localidade" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "localidadesDB": rows });
        }
    });
}
module.exports.getLocalidades = getLocalidades;

/**
 * Função para retorna a lista de generos da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getGeneros(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM genero";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela genero" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "generosDB": rows });
        }
    });
}
module.exports.getGeneros = getGeneros;

/**
 * Função para retorna a lista de modalidades da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getModalidades(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM modalidade";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela modalidade" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "modalidadesDB": rows });
        }
    });
}
module.exports.getModalidades = getModalidades;

/**
 * Função que permite remover uma modalidade
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function removerModalidade(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("DELETE FROM modalidade WHERE id=?", [Number(req.params.id)]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removerModalidade = removerModalidade;

/**
 * Permite criar ou editar um jogador
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateModalidade(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let nome = req.body.nome;
    let sql;
    if (req.method === "POST") {
        sql = mysql.format("INSERT INTO modalidade (nome) VALUES(?)", [nome]);
    } else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE modalidade SET nome=? WHERE id=?", [nome, Number(req.params.id)]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUpdateModalidade = createUpdateModalidade;


/**
 * Função para retorna a lista de tipos de torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTiposDeTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM tipodetorneio";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela tipo de torneio" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "tiposdetorneioDB": rows });
        }
    });
}
module.exports.getTiposDeTorneio = getTiposDeTorneio;

/**
 * Função para retorna a lista de equipas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getEquipas(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM equipa";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela equipa" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "equipasDB": rows });
        }
    });
}
module.exports.getEquipas = getEquipas;

/**
 * Função que permite remover uma equipa
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function removerEquipa(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("DELETE FROM equipa WHERE id = ?", [Number(req.params.id)]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removerEquipa = removerEquipa;


/**
 * Permite criar ou editar uma equipa
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateEquipa(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let nome = req.body.nome;
    let localidadeId = Number(req.body.localidade);
    let generoId = Number(req.body.genero);
    let modalidadeId = Number(req.body.modalidade);
    let sql;
    if (req.method === "POST") {
        sql = mysql.format("INSERT INTO equipa (nome, localidadeId, generoId, modalidadeId)  VALUES(?,?,?,?)",
            [nome, localidadeId, generoId, modalidadeId]);
    } else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE equipa SET nome=?, localidadeId=?, generoId=?, modalidadeId=? WHERE id=?",
                [nome, localidadeId, generoId, modalidadeId, Number(req.params.id)]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUpdateEquipa = createUpdateEquipa;


/**
 * Função para retorna a lista de torneios da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTorneios(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = "SELECT * FROM torneio";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela torneio" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "torneiosDB": rows });
        }
    });
}
module.exports.getTorneios = getTorneios;

/**
 * Função para retorna a lista de torneios da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTorneiosPorTipo(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("SELECT * FROM torneio WHERE tipodetorneioId=?", [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela torneio" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "torneiosDB": rows });
        }
    });
}
module.exports.getTorneiosPorTipo = getTorneiosPorTipo;


/**
 * Função para retorna a lista de torneios da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTorneiosPorModalidade(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("SELECT * FROM torneio WHERE modalidadeId=?", [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela torneio" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "torneiosDB": rows });
        }
    });
}
module.exports.getTorneiosPorModalidade = getTorneiosPorModalidade;

/**
 * Função que permite remover um torneio
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function removerTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("DELETE FROM torneio WHERE id = ?", [Number(req.params.id)]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removerTorneio = removerTorneio;

/**
 * Permite criar ou editar um torneio
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let nome = req.body.nome;
    let localidadeId = Number(req.body.localidade);
    let modalidadeId = Number(req.body.modalidade);
    let tiposdetorneioId = Number(req.body.tipo);
    let data = req.body.data;
    let generoId = Number(req.body.genero);
    let vencedor = req.body.vencedor;
    let sql;
    if (req.method === "POST") {
        sql = mysql.format("INSERT INTO torneio (nome, localidadeId, modalidadeId, tipodetorneioId, data, generoId, vencedor)  VALUES(?,?,?,?,?,?,?)",
            [nome, localidadeId, modalidadeId, tiposdetorneioId, data, generoId, vencedor]);
    } else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE torneio SET nome=?, localidadeId=?, modalidadeId=?, tipodetorneioId=?, data=?, generoId=?, vencedor=? WHERE id=?",
                [nome, localidadeId, modalidadeId, tiposdetorneioId, data, generoId, vencedor, Number(req.params.id)]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUpdateTorneio = createUpdateTorneio;

/**
 * Função para retorna a lista equipas inscritas no torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getEquipasNoTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = `SELECT te.*,e.* FROM torneioequipa te 
                 INNER JOIN equipa e
                 ON e.id = te.equipaId
                 WHERE te.torneioId=?`;
    let sql = mysql.format(query, [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela torneioequipa" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "torneioequipaDB": rows });
        }
    });
}
module.exports.getEquipasNoTorneio = getEquipasNoTorneio;

/**
 * Função para atualizar o vencedor do torneio.
 * @param {*} req 
 * @param {*} res 
 */
function updateVencedorTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let vencedor = req.body.vencedor;
    let sql = mysql.format("UPDATE torneio SET vencedor=? WHERE id=?", [vencedor, Number(req.params.id)]);
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.updateVencedorTorneio = updateVencedorTorneio;


/**
 * Função para retorna a lista equipas inscritas no torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function createEquipaNoTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let torneioId = Number(req.body.torneioId);
    let equipaId = Number(req.body.equipaId);
    let sql = mysql.format("INSERT INTO torneioequipa (torneioId, equipaId) VALUES(?,?)", [torneioId, equipaId]);
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createEquipaNoTorneio = createEquipaNoTorneio;

/**
 * Função para retorna a lista jogadores inscritos no torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function createJogadorNoTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let torneioId = Number(req.body.torneioId);
    let jogadorId = Number(req.body.jogadorId);
    let sql = mysql.format("INSERT INTO torneioindividual (torneioId, jogadorId) VALUES(?,?)", [torneioId, jogadorId]);
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createJogadorNoTorneio = createJogadorNoTorneio;

/**
 * Função para retorna a lista jogadores inscritos no torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getJogadoresNoTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = `SELECT ti.*,j.* FROM torneioindividual ti 
                 LEFT JOIN jogador j
                 ON j.id = ti.jogadorId
                 WHERE torneioId=?`;
    let sql = mysql.format(query, [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela torneioindividual" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "torneioindividualDB": rows });
        }
    });
}
module.exports.getJogadoresNoTorneio = getJogadoresNoTorneio;


/**
 * Função para retorna 
 * @param {*} req 
 * @param {*} res 
 */
function getEstatisticas(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    connection.query("SELECT * FROM estatistica", function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela estatistica" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "estatisticasDB": rows });
        }
    });
}
module.exports.getEstatisticas = getEstatisticas;


/**
 * Função para retorna 
 * @param {*} req 
 * @param {*} res 
 */
function getEstatisticaPorJogador(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("SELECT * FROM estatistica WHERE jogadorId=?", [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela estatistica" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "estatisticaJogadorDB": rows });
        }
    });
}
module.exports.getEstatisticaPorJogador = getEstatisticaPorJogador;


/**
 * Função para retorna 
 * @param {*} req 
 * @param {*} res 
 */
function getEstatisticaPorEquipa(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let sql = mysql.format("SELECT * FROM estatistica WHERE equipaId=?", [Number(req.params.id)]);
    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query para tabela estatistica" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "estatisticaEquipaDB": rows });
        }
    });
}
module.exports.getEstatisticaPorEquipa = getEstatisticaPorEquipa;

/**
 * Função para inserir nova jornada na BD.
 * @param {*} req 
 * @param {*} res 
 */
function createEstatistica(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let torneioId = Number(req.body.torneioId);
    let torneioTipo = Number(req.body.torneioTipo);
    let pontos = Number(req.body.pontos);
    let marcados = Number(req.body.marcados);
    let sofridos = Number(req.body.sofridos);
    let vitorias = Number(req.body.vitorias);
    let derrotas = Number(req.body.derrotas);
    let empates = Number(req.body.empates);
    let jogadorId = (req.body.jogadorId !== undefined) ? Number(req.body.jogadorId) : null;
    let equipaId = (req.body.equipaId !== undefined) ? Number(req.body.equipaId) : null;
    let query;
    let sql;
    if (torneioTipo === 1) {//jogadores
        if (req.method === "POST") {
            query = `INSERT INTO estatistica (pontos,marcados,sofridos,
                     vitorias,derrotas,empates,torneioId,jogadorId)
                     VALUES (?,?,?,?,?,?,?,?)`;
            sql = mysql.format(query, [pontos, marcados, sofridos, vitorias,
                derrotas, empates, torneioId, jogadorId]);
        }
    } else if (torneioTipo === 2) {//equipas
        if (req.method === "POST") {
            query = `INSERT INTO estatistica (pontos,marcados,sofridos,
                     vitorias,derrotas,empates,torneioId,equipaId)
                     VALUES (?,?,?,?,?,?,?,?)`;
            sql = mysql.format(query, [pontos, marcados, sofridos, vitorias,
                derrotas, empates, torneioId, equipaId]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createEstatistica = createEstatistica;


/**
 * Permite 
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateModalidade(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let nome = req.body.nome;
    let sql;
    if (req.method === "POST") {
        sql = mysql.format("INSERT INTO modalidade (nome) VALUES(?)", [nome]);
    } else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE modalidade SET nome=? WHERE id=?", [nome, Number(req.params.id)]);
        }
    }
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUpdateModalidade = createUpdateModalidade;
