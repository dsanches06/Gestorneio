"use strict";
/**
 * @file Classe para implementar estatistica.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * contador de Estatistica
 * @readonly
 */
let contadorEstatistica = 0;

/**
 * Classe Estatistica
 */

/**
* @class Representa uma estatistica
* @constructs Estatistica
* @param {number} pontos - pontos obtidos no torneio
* @param {number} marcados - golos marcados no torneio
* @param {number} sofridos - golos sofridos no torneio
* @param {number} vitorias - vitorias no torneio
* @param {number} empates - empates no torneio
* @param {number} derrotas - derrotas no torneio
* @param {Torneio} torneio - estatistica do torneio
*
* @property {number} id - id da estatistica
* @property {number} pontos - pontos obtidos no torneio
* @property {number} marcados - golos marcados no torneio
* @property {number} sofridos - golos sofridos no torneio
* @property {number} vitorias - vitorias no torneio
* @property {number} empates - empates no torneio
* @property {number} derrotas - derrotas no torneio
* @property {Torneio} torneio - estatistica do torneio
* @property {Equipa} equipa - equipa a atribuir estatistica
* @property {Jogador} jogador - jogador a atribuir estatistica
*/
function Estatistica(pontos, marcados, sofridos, vitorias, empates, derrotas, torneio) {
    this.id = ++contadorEstatistica;
    this.pontos = pontos;
    this.marcados = marcados;
    this.sofridos = sofridos;
    this.vitorias = vitorias;
    this.empates = empates;
    this.derrotas = derrotas;
    this.torneio = torneio;
    this.equipa = null;
    this.jogador = null;
}

/**
 * Função que atribuir e identifica a estatistica da BD
 * @param {number} id - id da nova estatistica
 */
Estatistica.prototype.setId = function (id) {
    this.id = id;
};

/**
 * Função que atribui e identifica a equipa na estatistica
 * @param {Equipa} equipa - equipa a atribuir estatistica
 */
Estatistica.prototype.setEquipa = function (equipa) {
    this.equipa = equipa;
};

/**
 * Função que atribui e identifica o jogador na estatistica
 * @param {Jogador} jogador - jogador a atribuir estatistica
 */
Estatistica.prototype.setJogador = function (jogador) {
    this.jogador = jogador;
};

/**
 * Função para obter os dados para mostrar a estatistica geral dos torneios
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} info - element html para visualizar info 
 */
function estatisticaGeral(info) {
    //estatistica
    info.estatisticas.forEach(function (current) {
        let torneioIndex = info.getTorneioIndex(current.torneioId);
        if (torneioIndex !== -1) {
            if (info.torneios[torneioIndex].tipo === 1) {//jogadores
                let jogadorIndex = info.getJogadorIndex(current.jogadorId);
                if (jogadorIndex !== -1) {
                    let estatistica = new Estatistica(
                        current.pontos,
                        current.marcados,
                        current.sofridos,
                        current.vitorias,
                        current.empates,
                        current.derrotas,
                        info.torneios[torneioIndex]);
                    estatistica.setId(current.id);
                    estatistica.setJogador(info.jogadores[jogadorIndex]);
                    info.jogadores[jogadorIndex].adicionarEstatistica(estatistica);
                }
            } else if (info.torneios[torneioIndex].tipo === 2) {//equipas
                let equipaIndex = info.getEquipaIndex(current.equipaId);
                if (equipaIndex !== -1) {
                    let estatistica = new Estatistica(
                        current.pontos,
                        current.marcados,
                        current.sofridos,
                        current.vitorias,
                        current.empates,
                        current.derrotas,
                        info.torneios[torneioIndex]);
                    estatistica.setId(current.id);
                    estatistica.setEquipa(info.equipas[equipaIndex]);
                    info.equipas[equipaIndex].adicionarEstatistica(estatistica);
                }
            }
        }
    });
    return info;
};

/**
 * Função que irá mostrar os dados da estatistica gerais dos torneios
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarEstatisticaGeral(info) {

    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let container = document.createElement("div");
    container.className = "container container-div";
    divCentral.appendChild(container);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Estatistica Gerais dos Torneios"));
    h3.className = "title mt-2 mb-5";
    container.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    info.jogadores.forEach(function (jogador) {
        if (jogador.estatisticas !== undefined) {
            graficoBarChartEquipaOuJogador(info, row, jogador);
            graficoPieChartEquipaOuJogador(info, row, jogador);
        }
    });

    info.equipas.forEach(function (equipa) {
        if (equipa.estatisticas !== undefined) {
            graficoBarChartEquipaOuJogador(info, row, equipa);
            graficoPieChartEquipaOuJogador(info, row, equipa);
        }
    });
}

/**
 * Função para mostrar a estatistica de um torneio
 * @param {Torneio} torneio - torneio a visualizar estatistica 
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarEstatisticaTorneio(torneio, info, tipo) {

    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let content = document.createElement("div");
    content.className = "content";
    divCentral.appendChild(content);

    let containerFluid = document.createElement("div");
    containerFluid.className = "container-fluid";
    content.appendChild(containerFluid);

    let row = document.createElement("div");
    row.className = "row";
    containerFluid.appendChild(row);

    let colmd12 = document.createElement("div");
    colmd12.className = "col-md-12";
    row.appendChild(colmd12);

    let card = document.createElement("div");
    card.setAttribute("id", "divCard");
    colmd12.appendChild(card);

    let header = document.createElement("div");
    header.className = "header";
    card.appendChild(header);

    let h4 = document.createElement("h4");
    h4.className = "title left";
    header.appendChild(h4);
    h4.appendChild(document.createTextNode("Estatistica de " + torneio.nome));

     //button cancelar
     let btnCancelar = document.createElement("a");
     btnCancelar.className = "btn btn-primary btn-sm w-auto text-white ml-3";
     btnCancelar.appendChild(document.createTextNode("Cancelar"));
     h4.appendChild(btnCancelar);
     btnCancelar.onclick = function () {
         if (tipo === "torneio") {
             info.detalhesTorneio(torneio);
         } else if (tipo === "modalidade") {
             info.getTorneioPorModalidade(info.getNomeModalidade(torneio.modalidade));
         }
     }
 

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "tabelaClassificacao");
    table.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let titulo = ["", "Nome", "PTS", "V", "E", "D", "GM", "GS", "Torneio"];
    let thead = tableHead(titulo);
    table.appendChild(thead);


    let tbody = tbodyTableEstatisticaTorneio(torneio);
    table.appendChild(tbody);

    //mostrar graficos
    mostrarGraficoTorneio(info, torneio);
}

/**
 * Função que mostra o corpo com os dados da estatistica de um torneio
 * @param {Torneio} torneio - torneioa visualizar estatistica
 * @returns {HTMLElement} tbody da tabela 
 */
function tbodyTableEstatisticaTorneio(torneio) {
    let lista = [];
    let tbody = document.createElement("tbody");
    if (torneio.tipo === 1) {//jogadores
        torneio.jogadores.forEach(function (jogador) {
            jogador.estatisticas.forEach(function (estatistica) {
                if (estatistica.torneio.id === torneio.id) {
                    let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                    estatisticaAux.setId(estatistica.id);
                    estatisticaAux.setJogador(jogador);
                    agruparEstatistica(lista, estatisticaAux);
                }
            });
        });
    } else if (torneio.tipo === 2) {//equipas
        torneio.equipas.forEach(function (equipa) {
            equipa.estatisticas.forEach(function (estatistica) {
                if (estatistica.torneio.id === torneio.id) {
                    let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                    estatisticaAux.setId(estatistica.id);
                    estatisticaAux.setEquipa(equipa);
                    agruparEstatistica(lista, estatisticaAux);
                }
            });
        });
    }

    lista.forEach(function (current, index) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 0
            let td0 = document.createElement("td");
            td0.appendChild(document.createTextNode(index + 1));
            tr.appendChild(td0);
            //criar coluna 1
            let td1 = document.createElement("td");
            if (torneio.tipo === 1) {
                td1.appendChild(document.createTextNode(current.jogador.nome));
            } else if (torneio.tipo === 2) {
                td1.appendChild(document.createTextNode(current.equipa.nome));
            }
            tr.appendChild(td1);
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(current.pontos));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(current.vitorias));
            tr.appendChild(td3);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(current.empates));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(current.derrotas));
            tr.appendChild(td5);
            //criar coluna 6
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(current.marcados));
            tr.appendChild(td6);
            //criar coluna 7
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(current.sofridos));
            tr.appendChild(td7);
            //criar coluna 8
            let td8 = document.createElement("td");
            td8.appendChild(document.createTextNode(current.torneio.nome));
            tr.appendChild(td8);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}


/**
 * Função para agrupar estatistica identicas em apenas uma
 * @param {object[]} lista - lista de estatisticas a agrupar
 * @param {Estatistica} estatistica - nova estatistica a ser adicionada na lista
 */
function agruparEstatistica(lista, estatistica) {
    let index = null;
    if (estatistica.torneio.tipo === 1) {//jogadores
        index = lista.findIndex(i => i.jogador.id === estatistica.jogador.id);
        if (index !== -1) {
            lista.forEach(function (current) {
                if (current.jogador.id === estatistica.jogador.id) {
                    estatistica.pontos += current.pontos;
                    estatistica.marcados += current.marcados;
                    estatistica.sofridos += current.sofridos;
                    estatistica.vitorias += current.vitorias;
                    estatistica.empates += current.empates;
                    estatistica.derrotas += current.derrotas;
                    //elimina da lista
                    lista.splice(index, 1);
                    //coloca novo
                    lista.push(estatistica);
                }
            });
        } else {
            lista.push(estatistica);
        }
    } else if (estatistica.torneio.tipo === 2) {//equipas
        index = lista.findIndex(i => i.equipa.id === estatistica.equipa.id);
        if (index !== -1) {
            lista.forEach(function (current) {
                if (current.equipa.id === estatistica.equipa.id) {
                    estatistica.pontos += current.pontos;
                    estatistica.marcados += current.marcados;
                    estatistica.sofridos += current.sofridos;
                    estatistica.vitorias += current.vitorias;
                    estatistica.empates += current.empates;
                    estatistica.derrotas += current.derrotas;
                    //elimina da lista
                    lista.splice(index, 1);
                    //coloca novo
                    lista.push(estatistica);
                }
            });
        } else {
            lista.push(estatistica);
        }
    }
}

/**
 * Função para mostrar os graficos da estatistica de um torneio
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {Torneio} torneio - torneio a visualizar estatistica grafica
 */
function mostrarGraficoTorneio(info, torneio) {

    let content = document.createElement("div");
    content.className = "content mt-3";
    document.getElementById(info.id).appendChild(content);

    let containerFluid = document.createElement("div");
    containerFluid.className = "container-fluid";
    content.appendChild(containerFluid);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Gráficos"));
    h3.style.textDecoration = "underline";
    containerFluid.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    containerFluid.appendChild(row);

    //tamanho coluna esquerda
    let colEsquerdo = document.createElement("div");
    colEsquerdo.className = "col-sm-6 mt-3 mb-3";
    row.appendChild(colEsquerdo);
    //graficos barchart
    graficoBarChartTorneio(info, colEsquerdo, torneio);

    //tamanho coluna direito
    let colunaDireito = document.createElement("div");
    colunaDireito.className = "col-sm-6 mt-3 mb-3";
    row.appendChild(colunaDireito);
    //graficos linechart
    graficoPieChartTorneio(info, colunaDireito, torneio);
}

/**
 * Grafico barChart para torneios
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {HTMLElement} coluna - element html para visualizar adicionar graficos 
 * @param {Torneio} torneio - torneio a visualizar grafico barchart
 */
function graficoBarChartTorneio(info, coluna, torneio) {
    if (torneio.tipo === 1) {//jogadores
        torneio.jogadores.forEach(function (current) {
            graficoBarChartEquipaOuJogador(info, coluna, current);
        });
    } else if (torneio.tipo === 2) {//equipas
        torneio.equipas.forEach(function (current) {
            graficoBarChartEquipaOuJogador(info, coluna, current);
        });
    }
}

/**
 * Grafico pieChart para torneios
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {HTMLElement} coluna - element html para visualizar adicionar graficos 
 * @param {Torneio} torneio - torneio a visualizar grafico piechart
 */
function graficoPieChartTorneio(info, coluna, torneio) {
    if (torneio.tipo === 1) {//jogadores
        torneio.jogadores.forEach(function (current) {
            graficoPieChartEquipaOuJogador(info, coluna, current);
        });
    } else if (torneio.tipo === 2) {//equipas
        torneio.equipas.forEach(function (current) {
            graficoPieChartEquipaOuJogador(info, coluna, current);
        });
    }
}

/**
 * Função que cria uma card para inserir um grafico 
 * @param {HTMLElement} coluna - element html para visualizar adicionar graficos 
 * @param {Torneio} torneio - torneio a obter valores para inserir grafico na coluna
 * @returns {HTMLElement} element html para visualizar adicionar graficos 
 */
function colunaCard(coluna, torneio) {
    //card
    let card = document.createElement("div");
    card.className = "card bg-secondary mb-3 mr-3";
    coluna.appendChild(card);
    //card-body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);
    //card-titulo
    let h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.style.fontSize = "1.2rem";
    cardBody.appendChild(h5);
    h5.appendChild(document.createTextNode(torneio.nome + " - " + info.getNomeModalidade(torneio.modalidade)));

    let div = document.createElement("div");
    div.setAttribute("id", "divGrafico");
    cardBody.appendChild(div);
    return cardBody;
}

/**
 * Grafico barChart para equipa ou jogador
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {HTMLElement} coluna - element html para visualizar adicionar graficos 
 * @param {object} aux - objeto auxiliar que representa um jogador ou uma equipa
 */
function graficoBarChartEquipaOuJogador(info, col, aux) {
    let lista = [];
    //loop
    if (aux.estatisticas !== undefined) {
        info.torneios.forEach(function (torneio) {
            aux.estatisticas.forEach(function (estatistica) {
                if (estatistica.torneio.id === torneio.id) {
                    let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                    if (torneio.tipo === 1) {//jogadores
                        estatisticaAux.setJogador(estatistica.jogador);
                    } else if (torneio.tipo === 2) {//equipas
                        estatisticaAux.setEquipa(estatistica.equipa);
                    }
                    agruparEstatistica(lista, estatisticaAux);
                }
            });
        });

        lista.forEach(function (current) {
            let data = [
                {
                    x: ['Pontos', 'Golos Marcados', 'Golos Sofridos', 'Vitorias', 'Derrotas', 'Empates'],
                    y: [current.pontos, current.marcados, current.sofridos, current.vitorias, current.derrotas, current.empates],
                    type: 'bar'
                }
            ];
            let layout = {
                title: aux.nome.concat(" - ").concat(current.torneio.nome),
                height: 400,
                width: 500
            };
            let divGrafico = document.createElement("div");
            divGrafico.setAttribute("id", aux.nome.concat(current.id).concat("barchart"));
            //obter o card
            let cardBody = colunaCard(col, aux);
            cardBody.appendChild(divGrafico);
            //cria o grafico
            Plotly.newPlot(divGrafico.id, data, layout);
        });
    } else {
        showSnackBar("Não há dados a mostrar da estatistica do " + aux.nome, 2000);
    }
}

/**
 * Grafico barPieChart para equipa ou jogador
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {HTMLElement} coluna - element html para visualizar adicionar graficos 
 * @param {object} aux - objeto auxiliar que representa um jogador ou uma equipa
 */
function graficoPieChartEquipaOuJogador(info, col, aux) {
    let lista = [];
    //loop
    if (aux.estatisticas !== undefined) {
        info.torneios.forEach(function (torneio) {
            aux.estatisticas.forEach(function (estatistica) {
                if (estatistica.torneio.id === torneio.id) {
                    let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                    if (torneio.tipo === 1) {//jogadores
                        estatisticaAux.setJogador(estatistica.jogador);
                    } else if (torneio.tipo === 2) {//equipas
                        estatisticaAux.setEquipa(estatistica.equipa);
                    }
                    agruparEstatistica(lista, estatisticaAux);
                }
            });
        });

        lista.forEach(function (current) {
            let data = [
                {
                    labels: ['Pontos', 'Golos Marcados', 'Golos Sofridos', 'Vitorias', 'Derrotas', 'Empates'],
                    values: [current.pontos, current.marcados, current.sofridos, current.vitorias, current.derrotas, current.empates],
                    type: 'pie'
                }
            ];
            let layout = {
                title: aux.nome.concat(" - ").concat(current.torneio.nome),
                height: 400,
                width: 500
            };
            let divGrafico = document.createElement("div");
            divGrafico.setAttribute("id", aux.nome.concat(current.id).concat("piechart"));
            //obter o card
            let cardBody = colunaCard(col, aux);
            cardBody.appendChild(divGrafico);
            //cria o grafico
            Plotly.newPlot(divGrafico.id, data, layout);
        });
    } else {
        showSnackBar("Não há dados a mostrar da estatistica do " + aux.nome, 2000);
    }
}
