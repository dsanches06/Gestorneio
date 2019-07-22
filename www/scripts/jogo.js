"use strict";
/**
 * @file Classes para implementar jogo e jornada.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Enumerado Tipos de resultados
 */

/**
 * @enum {number} Resultado - Tipos de resultados
 * @type {{VITORIA: number, DERROTA: number, DRAW: EMPATE}}
 */
let Resultado = {
    VITORIA: 3,
    DERROTA: 0,
    EMPATE: 1
};

/**
 * contador de jogo
 * @readonly
 */
let contadorJogo = 0;

/**
 * Classe Jogo 
 */

/**
 * @class representa um jogo
 * @constructs Jogo
 * @param {nome} nome - nome do jogo
 * @param {Object} emCasa - emCasa pode ser jogador ou equipa em que joga em casa 
 * @param {Object} visitante - visitante pode ser jogador ou equipa em que joga fora
 * 
 * @property {number} id - id do tipo de torneio
 * @property {nome} nome - nome do jogo
 * @property {Object} emCasa - emCasa pode ser jogador ou equipa em que joga em casa 
 * @property {Object} visitante - visitante pode ser jogador ou equipa em que joga fora
 * @property {number} goloEmCasa - golo do jogador ou equipa que joga em casa
 * @property {number} goloVisitante - golo do jogador ou equipa que joga fora
 * @property {Resultado} resultado - resultado do jogo
 * @property {jornada} jornada - jornada do jogo
 * @property {Estatistica[]} estatisticas - estatisticas do jogo simulado
 */
function Jogo(nome, emCasa, visitante) {
    this.id = ++contadorJogo;
    this.nome = nome;
    this.emCasa = emCasa;
    this.visitante = visitante;
    this.goloEmCasa = 0;
    this.goloVisitante = 0;
    this.resultado = { emCasa: Resultado.EMPATE, visitante: Resultado.EMPATE };
    this.jornada = null;
    this.estatisticas = [];
}

/**
 * Função que atribui e identifica a jornada do jogo
 * @param {jornada} - jornada para identificar jogo
 */
Jogo.prototype.setJornada = function (jornada) {
    this.jornada = jornada;
};

/**
 * Função para atualizar os valores do resultado do jogo
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {number} contador - contador a contabilizar total de jornadas
 * @param {Torneio} info - torneio a decorrer
 */
Jogo.prototype.atualizarResultados = function (info, contador, torneio) {

    //golos de equipa em casa
    this.emCasa.marcados += this.goloEmCasa;
    this.emCasa.sofridos += this.goloVisitante;

    //golos de equipa visitante
    this.visitante.marcados += this.goloVisitante;
    this.visitante.sofridos += this.goloEmCasa;

    if (this.goloEmCasa > this.goloVisitante) {
        this.resultado = { emCasa: Resultado.VITORIA, visitante: Resultado.DERROTA };
        //em casa
        this.emCasa.pontos += Resultado.VITORIA;
        this.emCasa.vitorias += 1;
        //visitante
        this.visitante.pontos += Resultado.DERROTA;
        this.visitante.derrotas += 1;
    } else if (this.goloEmCasa < this.goloVisitante) {
        this.resultado = { emCasa: Resultado.DERROTA, visitante: Resultado.VITORIA };
        //em casa
        this.emCasa.pontos += Resultado.DERROTA;
        this.emCasa.derrotas += 1;
        //visitante
        this.visitante.pontos += Resultado.VITORIA;
        this.visitante.vitorias += 1;
    } else {
        this.resultado = { emCasa: Resultado.EMPATE, visitante: Resultado.EMPATE };
        //em casa
        this.emCasa.pontos += Resultado.EMPATE;
        this.emCasa.empates += 1;
        //visitante
        this.visitante.pontos += Resultado.EMPATE;
        this.visitante.empates += 1;
    }

    // se for igual ao numero de jornadas
    if (contador === torneio.jornadas.length) {

        let estatisticaEmCasa = null;
        let estatisticaVisitante = null;
        if (this.jornada.torneio.tipo === 1) {//jogadores
            //em casa
            estatisticaEmCasa = new Estatistica(
                this.emCasa.pontos,
                this.emCasa.marcados,
                this.emCasa.sofridos,
                this.emCasa.vitorias,
                this.emCasa.empates,
                this.emCasa.derrotas,
                this.jornada.torneio);
            estatisticaEmCasa.setJogador(this.emCasa);
            //visitante
            estatisticaVisitante = new Estatistica(
                this.visitante.pontos,
                this.visitante.marcados,
                this.visitante.sofridos,
                this.visitante.vitorias,
                this.visitante.empates,
                this.visitante.derrotas,
                this.jornada.torneio);
            estatisticaVisitante.setJogador(this.visitante);
        } else if (this.jornada.torneio.tipo === 2) {//equipas
            //em casa
            estatisticaEmCasa = new Estatistica(
                this.emCasa.pontos,
                this.emCasa.marcados,
                this.emCasa.sofridos,
                this.emCasa.vitorias,
                this.emCasa.empates,
                this.emCasa.derrotas,
                this.jornada.torneio);
            estatisticaEmCasa.setEquipa(this.emCasa);
            //visitante
            estatisticaVisitante = new Estatistica(
                this.visitante.pontos,
                this.visitante.marcados,
                this.visitante.sofridos,
                this.visitante.vitorias,
                this.visitante.empates,
                this.visitante.derrotas,
                this.jornada.torneio);
            estatisticaVisitante.setEquipa(this.visitante);
        }
        //criar estatistica e salvar na DB
        if (estatisticaEmCasa !== undefined && estatisticaVisitante !== undefined) {
            info.createEstatistica(estatisticaEmCasa);
            info.createEstatistica(estatisticaVisitante);
        }
    }
};

/**
 * Função para resetar os valores do resultado do jogo
 */
Jogo.prototype.resetarResultados = function () {
    //o vencedor é nulo
    this.jornada.torneio.vencedor = "N/A";
    //golos de equipa em casa
    this.goloEmCasa = 0;
    this.emCasa.marcados = 0;
    this.emCasa.sofridos = 0;
    this.emCasa.pontos = 0;
    this.emCasa.vitorias = 0;
    this.emCasa.empates = 0;
    //golos de equipa visitante
    this.goloVisitante = 0;
    this.visitante.marcados = 0;
    this.visitante.sofridos = 0;
    this.visitante.pontos = 0;
    this.visitante.derrotas = 0;
    this.visitante.empates = 0;
};

/**
 * Classe Jornada
 */

/**
* @class representa uma jornada
* @constructs Jornada
* @param {number} id - id da jornada
* @param {Torneio} torneio - torneio a realizar
* 
* @property {number} id - id da jornada
* @property {nome} nome - nome da jornada
* @property {Torneio} torneio - torneio a realizar
* @property {Jogo[]} jogos - jogos da jornada
*/
function Jornada(id, torneio) {
    this.id = id;
    this.nome = "Jornada " + id;
    this.torneio = torneio;
    this.jogos = [];
}

/**
 * Função para adicionar jogos para gerar jornadas
 * @param {Jogo} - jogo a ser adicionado
 */
Jornada.prototype.adicionarJogo = function (jogo) {
    this.jogos.push(jogo);
};

