"use strict";
/**
 * @file Classes para implementar utils.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Função para criar um array multi-dimensional e retorna o array
 * @param {number} length - tamanho do array
 * @returns {Array} array bidimensional
 */
function criarArrayParaJornada(length) {
    let arr = new Array(length || 0);
    let i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = criarArrayParaJornada.apply(this, args);
    }

    return arr;
}

/**
 * Função que vai criar as jornadas de cada torneio e retorna a tabela
 * @param {Jornada} jornada - jornada do torneio a ser criado
 * @returns {HTMLElement} tabela com lista de jornadas
 */
function criarJornadaParaTorneio(jornada) {
    let table = document.createElement("table");
    table.setAttribute("id", jornada.nome);
    table.style.backgroundColor = "white";
    table.style.cssFloat = "left";
    table.style.border = "1px solid darkgrey";
    table.className = "table w-auto mr-5";
    let thead = tableHeadJornada(jornada.nome);
    table.appendChild(thead);
    let tBody = document.createElement("tbody");
    table.appendChild(tBody);
    jornada.jogos.forEach(function (jogo) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", jogo.id);
        tBody.appendChild(tr);
        let tdEmCasa = document.createElement("td");
        tdEmCasa.setAttribute("data-label", "Home");

        let tdEmCasaGolo = document.createElement("td");
        tdEmCasaGolo.setAttribute("data-label", "H.Goals");

        let tdVs = document.createElement("td");
        tdVs.textContent = " - ";
        tdVs.style.backgroundColor = "gray";

        let tdVisitanteGolo = document.createElement("td");
        tdVisitanteGolo.setAttribute("data-label", "A.Goals");

        let tdVisitante = document.createElement("td");
        tdVisitante.setAttribute("data-label", "Away");

        tdEmCasa.textContent = obterAcronimo(jogo.emCasa.nome);
        tdEmCasaGolo.textContent = jogo.goloEmCasa;
        tdVisitanteGolo.textContent = jogo.goloVisitante
        tdVisitante.textContent = obterAcronimo(jogo.visitante.nome);

        tr.appendChild(tdEmCasa);
        tr.appendChild(tdEmCasaGolo);
        tr.appendChild(tdVs);
        tr.appendChild(tdVisitanteGolo);
        tr.appendChild(tdVisitante);
    });
    return table;
}

/**
 * Função para configurar torneio e criar jogos e jornadas
 * @param {Torneio} torneio - torneio a ser configurado para criar jogos e gerar jornadas
 */
function configurarTorneio(torneio) {
    if (torneio.jornadas.length === 0) {
        let total;
        if (torneio.tipo === 1) {//jogadores
            total = torneio.jogadores.length;
        } else if (torneio.tipo === 2) {///equipas
            total = torneio.equipas.length;
        }
        let totalMatchGroups = total - 1;
        let matchesPerMatchGroup = total / 2;
        let rounds = criarArrayParaJornada(totalMatchGroups, matchesPerMatchGroup);

        for (let i = 0; i < totalMatchGroups; i++) {

            for (let j = 0; j < matchesPerMatchGroup; j++) {

                let casa = (i + j) % (total - 1);
                let fora = (total - 1 - j + i) % (total - 1);

                if (j === 0) fora = total - 1;

                let emCasa;
                let visitante;
                if (torneio.tipo === 1) {//jogadores
                    emCasa = torneio.jogadores[casa];
                    visitante = torneio.jogadores[fora];
                    rounds[i][j] = new Jogo(obterAcronimo(emCasa.nome) + " VS " + obterAcronimo(visitante.nome), emCasa, visitante);
                } else if (torneio.tipo === 2) {///equipas
                    emCasa = torneio.equipas[casa];
                    visitante = torneio.equipas[fora];
                    rounds[i][j] = new Jogo(obterAcronimo(emCasa.nome) + " VS " + obterAcronimo(visitante.nome), emCasa, visitante);
                }
            }
        }

        //Disperse by even && odd
        let dispersed = criarArrayParaJornada(totalMatchGroups, matchesPerMatchGroup);

        let odd = (total / 2);
        let evn = 0;
        for (let i = 0; i < rounds.length; i++) {
            if (i % 2 !== 0) {
                dispersed[i] = rounds[odd++];
            } else {
                dispersed[i] = rounds[evn++];
            }
        }
        rounds = dispersed;

        //Create and populate app objects
        let firstHand = [];
        rounds.forEach(function (round, index) {
            let contador = index + 1;
            let jornadaInicial = new Jornada(contador, torneio);
            round.forEach(function (jogo) {
                jogo.setJornada(jornadaInicial);
                jornadaInicial.adicionarJogo(jogo);
            });
            firstHand.push(jornadaInicial);
        });
        // Second Hand will be the mirror of the first hand
        let contador = firstHand.length + 1;
        let secondHand = [];
        firstHand.forEach(function (jornada) {
            let jornadaFinal = new Jornada(contador, torneio);
            contador++;
            jornada.jogos.forEach(function (jogo) {
                let jogoFinal = new Jogo(obterAcronimo(jogo.visitante.nome) + " vs " + obterAcronimo(jogo.emCasa.nome), jogo.visitante, jogo.emCasa);

                jogoFinal.setJornada(jornadaFinal);
                jornadaFinal.adicionarJogo(jogoFinal);

            });
            secondHand.push(jornadaFinal);
        });
        torneio.setJornadas(firstHand.concat(secondHand));
    }
}

/**
 * Função que recebe o nome de equipas ou jogadores e retorna o acronimo
 * @param {string} nome - nome da equipa ou jogadores
 * @returns {string} acronimo do nome
 */
function obterAcronimo(nome) {
    let palavra = nome.split(' ');
    let acronimo = "";
    let index = 0;
    while (index < palavra.length) {
        let proxima = palavra[index];
        acronimo = acronimo + proxima.charAt(0);
        index += 1;
    }
    return acronimo.toUpperCase();
}

/**
 * Função para ordenar jogadores ou equipas por pontos
 * @param {Torneio} torneio - torneio a ordenar estatisticas de jogadores e equipas
 * @returns {number} retorna -1, 1 ou 0
 */
function ordenacaoPorPontos(torneio) {
    let lista = [];
    if (torneio.tipo === 1) {//jogadores
        lista = torneio.jogadores;
    } else if (torneio.tipo === 2) {//equipas
        lista = torneio.equipas;
    }
    lista.sort(function (a, b) {
        if (a.pontos > b.pontos) {
            return -1;
        } else if (a.pontos === b.pontos) {
            if (a.totalGolos() > b.totalGolos()) {
                return -1;
            } else if (a.totalGolos() < b.totalGolos()) {
                return 1;
            } else {
                return 0;
            }
        } else {

            return 1;
        }
    });
}
