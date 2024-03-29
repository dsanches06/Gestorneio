"use strict";
/**
 * @file Classes para implementar equipa.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Classe Equipa
 */

/**
* @class Representa uma equipa
* @constructs Equipa
* @param {number} id - id da equipa
* @param {string} nome - nome da equipa 
* @param {Localidade} localidade - localidade da equipa
* @param {Genero} genero - genero(M/F) da equipa
* @param {Modalidade} modalidade - modalidade da equipa
*
* @property {number} id - id da equipa
* @property {string} nome - nome da equipa
* @property {Localidade} localidade - localidade da equipa
* @property {Genero} genero(M/F) - genero da equipa
* @property {Modalidade} modalidade - modalidade da equipa
* @property {number} pontos - pontos da equipa
* @property {number} marcados - golos marcados pela equipa
* @property {number} sofridos - golos sofridos pela equipa
* @property {number} vitorias - vitorias da equipa
* @property {number} empates - empates da equipa
* @property {number} derrotas - derrotas da equipa
* @property {Estatistica[]} estatisticas - estatisticas da equipa
*/
function Equipa(id, nome, localidade, genero, modalidade) {
    this.id = id;
    this.nome = nome;
    this.localidade = localidade;
    this.genero = genero;
    this.modalidade = modalidade;
    this.pontos = 0;
    this.marcados = 0;
    this.sofridos = 0;
    this.vitorias = 0;
    this.empates = 0;
    this.derrotas = 0;
    this.estatisticas = [];
}

/**
 * Função que calcula e retorna o total de golos de uma equipa
 * @returns {number} total de golos de uma equipa no torneio
 */
Equipa.prototype.totalGolos = function () {
    return this.marcados - this.sofridos;
};

/**
 * Função para adicionar estatisticas de uma equipa
 * @param {Estatistica} estatistica - estatistica a ser adicionada na equipa 
 */
Equipa.prototype.adicionarEstatistica = function (estatistica) {
    this.estatisticas.push(estatistica);
};

/**
 * Função para mostrar a lista de equipas
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarTabelaEquipas(info) {

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

    let divCriarNovaEquipa = document.createElement("div");
    divCriarNovaEquipa.style = "float:right;";
    header.appendChild(divCriarNovaEquipa);

    let img = document.createElement("img");
    img.src = "./images/plus.png";
    img.className = "largura altura";
    divCriarNovaEquipa.appendChild(img);

    let a = document.createElement("a");
    a.className = "ml-1";
    a.style = "cursor:pointer;font-weight:bold;";
    a.appendChild(document.createTextNode("Criar Nova Equipa"));
    a.onclick = function () {
        criarNovaEquipa(info);
    };
    divCriarNovaEquipa.appendChild(a);

    let h4 = document.createElement("h4");
    h4.className = "title left";
    h4.appendChild(document.createTextNode("Lista de Equipas"));
    header.appendChild(h4);

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");
    table.className = "table table-hover table-striped table-bordered w-100";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let equipaHead = ["Nome", "Localidade", "Genero", "Modalidade", "Operações"];
    let thead = tableHead(equipaHead);
    table.appendChild(thead);

    let tbody = tbodyTableEquipa(info);
    table.appendChild(tbody);

    loadDatatable(table.id);
}

/**
 * Função para criar o corpo da tabela da equipa
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela 
 */
function tbodyTableEquipa(info) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < info.equipas.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(info.equipas[i].nome));
            tr.appendChild(td2);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(info.getNomeLocalidade(info.equipas[i].localidade)));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(info.getTipoGenero(info.equipas[i].genero)));
            tr.appendChild(td5);
            //criar coluna 7
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(info.getNomeModalidade(info.equipas[i].modalidade)));
            tr.appendChild(td7);
            //criar coluna 8
            let td8 = document.createElement("td");
            tr.appendChild(td8);
            //link btnDetalhes
            let btnDetalhes = document.createElement("a");
            btnDetalhes.setAttribute("id", info.equipas[i].id);
            btnDetalhes.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnDetalhes.className = "mr-2";
            btnDetalhes.appendChild(document.createTextNode("Detalhes"));
            btnDetalhes.onclick = function () {
                info.getEstatisticaPorEquipa(Number(info.equipas[i].id), "detalhesEquipa");
            };
            td8.appendChild(btnDetalhes);
            //link btnEditar 
            let btnEditar = document.createElement("a");
            btnEditar.setAttribute("id", info.equipas[i].id);
            btnEditar.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnEditar.className = "mr-2";
            btnEditar.appendChild(document.createTextNode("Editar"));
            btnEditar.onclick = function () {
                let confirm = window.confirm("Deseja editar os dados da equipa do " + info.equipas[i].nome + "?");
                if (confirm === true) {
                    editarEquipa(Number(info.equipas[i].id), info);
                } else {
                    showSnackBar("Foi cancelada a edição dos dados da equipa do " + info.equipas[i].nome, 2000);
                }
            };
            td8.appendChild(btnEditar);
            //link btnRemover 
            let btnRemover = document.createElement("a");
            btnRemover.setAttribute("id", info.equipas[i].id);
            btnRemover.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnRemover.appendChild(document.createTextNode("Remover"));
            btnRemover.onclick = function () {
                let confirm = window.confirm("Deseja remover a equipa do " + info.equipas[i].nome + "?");
                if (confirm === true) {
                    info.removerEquipa(Number(info.equipas[i].id));
                } else {
                    showSnackBar("Foi cancelada a remoção da equipa do " + info.equipas[i].nome, 2000);
                }
            };
            td8.appendChild(btnRemover);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
 * Função para criar nova equipa
 * @param {HTMLElement} info - element html para visualizar info 
 */
function criarNovaEquipa(info) {
    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    document.getElementById("divFormularioEquipa").style.display = "block";
    document.getElementById("formEquipa").reset();//limpar formulario
    document.getElementById("formEquipa").action = "javascript:info.processarEquipa('create');";

    let localidade = document.getElementById("localidadeEquipa");
    localidade.options[0] = new Option("");
    for (let i = 0; i < info.localidades.length; i++) {
        localidade.options[i + 1] = new Option(info.localidades[i].nome, info.localidades[i].id);
    }

    let genero = document.getElementById("generoEquipa");
    genero.options[0] = new Option("");
    for (let i = 0; i < info.generos.length; i++) {
        genero.options[i + 1] = new Option(info.generos[i].tipo, info.generos[i].id);
    }

    let modalidade = document.getElementById("modalidadeEquipa");
    modalidade.options[0] = new Option("");
    for (let i = 0; i < info.modalidades.length; i++) {
        modalidade.options[i + 1] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
    }
}

/**
 * Função para editar os dados de uma equipa
 * @param {number} id - id da equipa a editar dados
 * @param {HTMLElement} info - element html para visualizar info 
 */
function editarEquipa(id, info) {
    let index = info.getEquipaIndex(id);
    if (index !== -1) {
        let equipa = info.equipas[index];
        document.getElementById("idEquipa").value = equipa.id;
        document.getElementById("nomeEquipa").value = equipa.nome;

        let localidadeId = equipa.localidade;
        for (let i = 0; i < info.localidades.length; i++) {
            document.getElementById("localidadeEquipa").options[i] = new Option(info.localidades[i].nome, info.localidades[i].id);
            if (info.localidades[i].id === localidadeId) {
                document.getElementById("localidadeEquipa").selectedIndex = i;
            }
        }

        let generoId = equipa.genero;
        for (let i = 0; i < info.generos.length; i++) {
            //se genero for diferente de misto
            document.getElementById("generoEquipa").options[i] = new Option(info.generos[i].tipo, info.generos[i].id);
            if (info.generos[i].id === generoId) {
                document.getElementById("generoEquipa").selectedIndex = i;
            }
        }

        let modalidadeId = equipa.modalidade;
        for (let i = 0; i < info.modalidades.length; i++) {
            document.getElementById("modalidadeEquipa").options[i] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
            if (info.modalidades[i].id === modalidadeId) {
                document.getElementById("modalidadeEquipa").selectedIndex = i;
            }
        }

        let divCentral = document.getElementById(info.id);
        limparDiv(divCentral);

        document.getElementById("divFormularioEquipa").style.display = "block";
        document.getElementById("formEquipa").action = "javascript:info.processarEquipa('update');";
    }
}

/**
 * Função para visualizar estatistica de uma equipa
 * @param {Equipa} equipa - equipa a visualizar estatistica
 * @param {HTMLElement} info - element html para visualizar info 
 */
function visualizarDetalhesEquipa(equipa, info) {

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

    let headerTitulo = document.createElement("div");
    headerTitulo.className = "header";
    card.appendChild(headerTitulo);

    let tituloEquipa = document.createElement("h4");
    tituloEquipa.className = "title left mb-3";
    tituloEquipa.appendChild(document.createTextNode("Dados de " + equipa.nome));
    headerTitulo.appendChild(tituloEquipa);

    //button cancelar
    let btnCancelar = document.createElement("a");
    btnCancelar.className = "btn btn-primary btn-sm w-auto text-white ml-3";
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    btnCancelar.onclick = function () {
        info.menuGetEquipas();
    }
    tituloEquipa.appendChild(btnCancelar);

    let divTabelaEquipa = document.createElement("div");
    divTabelaEquipa.setAttribute("id", "divTabelaEquipa");
    divTabelaEquipa.className = "content table-responsive table-full-width";
    card.appendChild(divTabelaEquipa);

    let tableEquipa = document.createElement("table");
    tableEquipa.setAttribute("id", "tableEquipa");
    tableEquipa.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    tableEquipa.cellSpacing = 0;
    divTabelaEquipa.appendChild(tableEquipa);

    let equipaHead = ["Nome", "Localidade", "Genero", "Modalidade"];
    let equipaThead = tableHead(equipaHead);
    tableEquipa.appendChild(equipaThead);

    let equipaTbody = tbodyEquipa(equipa, info);
    tableEquipa.appendChild(equipaTbody);

    let headerEstatistica = document.createElement("div");
    headerEstatistica.className = "header";
    card.appendChild(headerEstatistica);

    let tituloEstatistica = document.createElement("h4");
    tituloEstatistica.className = "title left mt-3 mb-3";
    tituloEstatistica.style.textDecoration = "underline";
    tituloEstatistica.appendChild(document.createTextNode("Estatisticas"));
    headerEstatistica.appendChild(tituloEstatistica);

    let divTabelaEstatistica = document.createElement("div");
    divTabelaEstatistica.setAttribute("id", "divTabelaEstatistica");
    divTabelaEstatistica.className = "content table-responsive table-full-width";
    card.appendChild(divTabelaEstatistica);

    let tableEstatistica = document.createElement("table");
    tableEstatistica.setAttribute("id", "tabelaEstatistica");
    tableEstatistica.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    tableEstatistica.cellSpacing = 0;
    divTabelaEstatistica.appendChild(tableEstatistica);

    let estatisticaHead = ["Nome", "PTS", "V", "E", "D", "GM", "GS", "Torneio"];
    let estatisticaThead = tableHead(estatisticaHead);
    tableEstatistica.appendChild(estatisticaThead);

    let tbodyEstatistica = tbodyTableEstatisticaEquipa(equipa, info);
    tableEstatistica.appendChild(tbodyEstatistica);

    //mostrar grafico
    mostrarGraficoEquipa(info, equipa);
}

/**
 * Função que cria e mostra o corpo da tabela com os dados de uma equipa
 * @param {Equipa} equipa - equipa 
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyEquipa(equipa, info) {
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    tr.className = "text-center";
    //criar coluna 2
    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(equipa.nome));
    tr.appendChild(td2);
    //criar coluna 4
    let td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(info.getNomeLocalidade(equipa.localidade)));
    tr.appendChild(td4);
    //criar coluna 5
    let td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(info.getTipoGenero(equipa.genero)));
    tr.appendChild(td5);
    //criar coluna 7
    let td7 = document.createElement("td");
    td7.appendChild(document.createTextNode(info.getNomeModalidade(equipa.modalidade)));
    tr.appendChild(td7);
    tbody.appendChild(tr);
    return tbody;
}



/**
 * Função que cria e mostra o corpo da tabela com os dados
 * da estatistica de uma equipa
 * @param {Equipa} equipa - equipa a listar estatistica
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableEstatisticaEquipa(equipa, info) {
    let lista = [];
    let tbody = document.createElement("tbody");
    info.torneios.forEach(function (torneio) {
        equipa.estatisticas.forEach(function (estatistica) {
            if (estatistica.torneio.id === torneio.id) {
                let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                estatisticaAux.setId(estatistica.id);
                estatisticaAux.setEquipa(equipa);
                agruparEstatistica(lista, estatisticaAux);
            }
        });
    });

    lista.forEach(function (current) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 1
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(equipa.nome));
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
 * Função que mostra os graficos de uma equipa
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {Equipa} equipa - equipa a visualizar estatistica 
 */
function mostrarGraficoEquipa(info, equipa) {

    let container = document.createElement("div");
    container.className = "container container-div mt-3";
    document.getElementById(info.id).appendChild(container);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Gráficos"));
    h3.style.textDecoration = "underline";
    container.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    //tamanho coluna esquerda
    let colEsquerdo = document.createElement("div");
    colEsquerdo.className = "col-sm-6 mt-3 mb-3";
    row.appendChild(colEsquerdo);
    //graficos barchart
    graficoBarChartEquipaOuJogador(info, colEsquerdo, equipa);

    //tamanho coluna direito
    let colunaDireito = document.createElement("div");
    colunaDireito.className = "col-sm-6 mt-3 mb-3";
    row.appendChild(colunaDireito);
    //graficos linechart
    graficoPieChartEquipaOuJogador(info, colunaDireito, equipa);
}
