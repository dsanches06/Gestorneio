"use strict";
/**
 * @file Classes para implementar jogador.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Função para calcular idade
 * @param {Date} data - data de nascimento do jogador
 * @returns {number} idade - idade do jogador 
 */
function calcularIdade(data) {
    let getData = data.split("-");
    let dataNascimento = new Date(
        parseInt(getData[0], 10), //dia
        parseInt(getData[1], 10) - 1, //mes 
        parseInt(getData[2], 10)); //ano
    let diferenca = Date.now() - dataNascimento.getTime();
    let idade = new Date(diferenca);
    return Math.abs(idade.getUTCFullYear() - 1970);
};

/**
 * Classe Jogador
 */

/**
* @class Representa um jogador
* @constructs Jogador
* @param {number} id - id do jogador
* @param {string} nome - nome do jogador 
* @param {Date} dataNascimento - data de nascimento do jogador
* @param {Localidade} localidade - localidade do jogador
* @param {Genero} genero - genero(M/F) do jogador
* @param {Modalidade} modalidade - modalidade do jogador
*
* @property {number} id - id do jogador
* @property {string} nome - nome do jogador 
* @property {Date} dataNascimento - data de nascimento do jogador
* @property {number} idade - idade do jogador
* @property {Localidade} localidade - localidade do jogador
* @property {Genero} genero - genero do jogador
* @property {Modalidade} modalidade - modalidade do jogador
* @property {number} pontos - pontos do jogador
* @property {number} marcados - golos marcados pelo jogador
* @property {number} sofridos - golos sofridos pelo jogador
* @property {number} vitorias - vitorias do jogador
* @property {number} empates - empates do jogador
* @property {number} derrotas - derrotas do jogador
* @property {Estatistica[]} estatisticas - estatisticas do jogador
*/
function Jogador(id, nome, dataNascimento, localidade, genero, modalidade) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.idade = calcularIdade(dataNascimento);
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
 * Função que calcula e retorna o total de golos de um jogador
 * @returns {number} total de golos de um jogador no torneio
 */
Jogador.prototype.totalGolos = function () {
    return this.marcados - this.sofridos;
};

/**
 * Função para adicionar estatisticas de um jogador
 * @param {Estatistica} estatistica - estatistica a ser adicionada no jogador 
 */
Jogador.prototype.adicionarEstatistica = function (estatistica) {
    this.estatisticas.push(estatistica);
};

/**
 * Função para mostrar a lista de jogadores
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarTabelaJogadores(info) {

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

    let divCriarNovoJogador = document.createElement("div");
    divCriarNovoJogador.style = "float:right;";
    header.appendChild(divCriarNovoJogador);

    let img = document.createElement("img");
    img.src = "./images/plus.png";
    img.className = "largura altura";
    divCriarNovoJogador.appendChild(img);

    let a = document.createElement("a");
    a.className = "ml-1";
    a.style = "cursor:pointer;font-weight:bold;";
    a.appendChild(document.createTextNode("Criar Novo Jogador"));
    a.onclick = function () {
        criarNovoJogador(info);
    };
    divCriarNovoJogador.appendChild(a);

    let h4 = document.createElement("h4");
    h4.className = "title left";
    h4.appendChild(document.createTextNode("Lista de Jogadores"));
    header.appendChild(h4);

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");
    table.className = "table table-hover table-striped table-bordered nowrap w-100";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let jogadorHead = ["Nome", "Idade", "Genero", "Localidade", "Modalidade", "Operações"];
    let thead = tableHead(jogadorHead);
    table.appendChild(thead);

    let tbody = tbodyTableJogador(info);
    table.appendChild(tbody);

    loadDatatable(table.id);
}

/**
 * Função para criar o corpo da tabela de jogador
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela 
 */
function tbodyTableJogador(info) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < info.jogadores.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(info.jogadores[i].nome));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(info.jogadores[i].idade));
            tr.appendChild(td3);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(info.getTipoGenero(info.jogadores[i].genero)));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(info.getNomeLocalidade(info.jogadores[i].localidade)));
            tr.appendChild(td5);
            //criar coluna 6
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(info.getNomeModalidade(info.jogadores[i].modalidade)));
            tr.appendChild(td6);
            //criar coluna 7
            let td7 = document.createElement("td");
            tr.appendChild(td7);
            //link btnDetalhes 
            let btnDetalhes = document.createElement("a");
            btnDetalhes.setAttribute("id", info.jogadores[i].id);
            btnDetalhes.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnDetalhes.className = "mr-2";
            btnDetalhes.appendChild(document.createTextNode("Detalhes"));
            btnDetalhes.onclick = function () {
                info.getEstatisticaPorJogador(info.jogadores[i].id, "detalhesJogador");
            };
            td7.appendChild(btnDetalhes);
            //link btnEditar 
            let btnEditar = document.createElement("a");
            btnEditar.setAttribute("id", info.jogadores[i].id);
            btnEditar.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnEditar.className = "mr-2";
            btnEditar.appendChild(document.createTextNode("Editar"));
            btnEditar.onclick = function () {
                let confirm = window.confirm("Deseja editar os dados do jogador " + info.jogadores[i].id + "?");
                if (confirm === true) {
                    editarJogador(Number(info.jogadores[i].id), info);
                } else {
                    showSnackBar("Foi cancelada a edição dos dados do jogador " + info.jogadores[i].id, 2000);
                }
            };
            td7.appendChild(btnEditar);
            //link btnRemover 
            let btnRemover = document.createElement("a");
            btnRemover.setAttribute("id", info.jogadores[i].id);
            btnRemover.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnRemover.appendChild(document.createTextNode("Remover"));
            btnRemover.onclick = function () {
                let confirm = window.confirm("Deseja remover o jogador " + info.jogadores[i].id + "?");
                if (confirm === true) {
                    info.removerJogador(Number(info.jogadores[i].id));
                } else {
                    showSnackBar("Foi cancelada a remoção do jogador " + info.jogadores[i].id, 2000);
                }
            };
            td7.appendChild(btnRemover);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
 * Função para criar novo Jogador
 * @param {HTMLElement} info - element html para visualizar info 
 */
function criarNovoJogador(info) {
    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    document.getElementById("divFormularioJogador").style.display = "block";
    document.getElementById("formJogador").reset();//limpar formulario
    document.getElementById("formJogador").action = "javascript:info.processarJogador('create');";

    let localidade = document.getElementById("localidadeJogador");
    localidade.options[0] = new Option("");
    for (let i = 0; i < info.localidades.length; i++) {
        localidade.options[i + 1] = new Option(info.localidades[i].nome, info.localidades[i].id);
    }

    let genero = document.getElementById("generoJogador");
    genero.options[0] = new Option("");
    for (let i = 0; i < info.generos.length; i++) {
        genero.options[i + 1] = new Option(info.generos[i].tipo, info.generos[i].id);
    }

    let modalidade = document.getElementById("modalidadeJogador");
    modalidade.options[0] = new Option("");
    for (let i = 0; i < info.modalidades.length; i++) {
        modalidade.options[i + 1] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
    }
}

/**
 * Função para editar os dados de um jogador
 * @param {number} id - id do jogador a editar dados
 * @param {HTMLElement} info - element html para visualizar info 
 */
function editarJogador(id, info) {
    let index = info.getJogadorIndex(id);
    if (index !== -1) {
        let jogador = info.jogadores[index];
        document.getElementById("idJogador").value = jogador.id;
        document.getElementById("nomeJogador").value = jogador.nome;
        document.getElementById("dataNascimento").value = jogador.dataNascimento;
        let localidade = jogador.localidade;
        for (let i = 0; i < info.localidades.length; i++) {
            document.getElementById("localidadeJogador").options[i] = new Option(info.localidades[i].nome, info.localidades[i].id);
            if (info.localidades[i].id === localidade) {
                document.getElementById("localidadeJogador").selectedIndex = i;
            }
        }

        let generoJogador = jogador.genero;
        for (let i = 0; i < info.generos.length; i++) {
            //se genero for diferente de misto
            if (info.generos[i].id !== 3) {
                document.getElementById("generoJogador").options[i] = new Option(info.generos[i].tipo, info.generos[i].id);
                if (info.generos[i].id === generoJogador) {
                    document.getElementById("generoJogador").selectedIndex = i;
                }
            }
        }

        let modalidadeJogador = jogador.modalidade;
        for (let i = 0; i < info.modalidades.length; i++) {
            document.getElementById("modalidadeJogador").options[i] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
            if (info.modalidades[i].id === modalidadeJogador) {
                document.getElementById("modalidadeJogador").selectedIndex = i;
            }
        }

        let divCentral = document.getElementById(info.id);
        limparDiv(divCentral);

        document.getElementById("divFormularioJogador").style.display = "block";
        document.getElementById("formJogador").action = "javascript: info.processarJogador('update')";
    }
}

/**
 * Função para visualizar estatistica de um jogador
 * @param {Jogador} jogador - jogador a visualizar estatistica
 * @param {HTMLElement} info - element html para visualizar info 
 */
function visualizarDetalhesJogador(jogador, info) {
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

    let tituloJogador = document.createElement("h4");
    tituloJogador.className = "title left mb-3";
    tituloJogador.appendChild(document.createTextNode("Dados de " + jogador.nome));
    headerTitulo.appendChild(tituloJogador);

    //button cancelar
    let btnCancelar = document.createElement("a");
    btnCancelar.className = "btn btn-primary btn-sm w-auto text-white ml-3";
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    btnCancelar.onclick = function () {
        info.menuGetJogadores();
    }
    tituloJogador.appendChild(btnCancelar);

    let divTabelaJogador = document.createElement("div");
    divTabelaJogador.setAttribute("id", "divTabelaJogador");
    divTabelaJogador.className = "content table-responsive table-full-width";
    card.appendChild(divTabelaJogador);

    let tableJogador = document.createElement("table");
    tableJogador.setAttribute("id", "tabelaJogador");
    tableJogador.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    tableJogador.cellSpacing = 0;
    divTabelaJogador.appendChild(tableJogador);

    let jogadorHead = ["Nome", "Idade", "Localidade", "Genero", "Modalidade"];
    let jogadorThead = tableHead(jogadorHead);
    tableJogador.appendChild(jogadorThead);

    let jogadorTbody = tbodyJogador(jogador, info);
    tableJogador.appendChild(jogadorTbody);

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

    let tbodyEstatistica = tbodyTableEstatisticaJogador(jogador, info);
    tableEstatistica.appendChild(tbodyEstatistica);

    //mostrar grafico
    mostrarGraficoJogador(info, jogador);
}

/**
 * Função que cria e mostra o corpo da tabela com os dados de um jogador
 * @param {Jogador} jogador - jogador 
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyJogador(jogador, info) {
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    tr.className = "text-center";
    //criar coluna 2
    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(jogador.nome));
    tr.appendChild(td2);
    //criar coluna 3
    let td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(jogador.idade));
    tr.appendChild(td3);
    //criar coluna 4
    let td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(info.getTipoGenero(jogador.genero)));
    tr.appendChild(td4);
    //criar coluna 5
    let td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(info.getNomeLocalidade(jogador.localidade)));
    tr.appendChild(td5);
    //criar coluna 6
    let td6 = document.createElement("td");
    td6.appendChild(document.createTextNode(info.getNomeModalidade(jogador.modalidade)));
    tr.appendChild(td6);
    tbody.appendChild(tr);
    return tbody;
}

/**
 * Função que cria e mostra o corpo da tabela com os dados
 * da estatistica de um jogador
 * @param {Jogador} jogador - jogador a listar estatistica
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableEstatisticaJogador(jogador, info) {
    let lista = [];
    let tbody = document.createElement("tbody");
    info.torneios.forEach(function (torneio) {
        jogador.estatisticas.forEach(function (estatistica) {
            if (estatistica.torneio.id === torneio.id) {
                let estatisticaAux = new Estatistica(estatistica.pontos, estatistica.marcados, estatistica.sofridos, estatistica.vitorias, estatistica.empates, estatistica.derrotas, torneio);
                estatisticaAux.setId(estatistica.id);
                estatisticaAux.setJogador(jogador);
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
            td1.appendChild(document.createTextNode(jogador.nome));
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
 * Função que mostra os graficos de um jogador
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {Jogador} jogador - jogador a visualizar estatistica 
 */
function mostrarGraficoJogador(info, jogador) {

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
    graficoBarChartEquipaOuJogador(info, colEsquerdo, jogador);

    //tamanho coluna direito
    let colunaDireito = document.createElement("div");
    colunaDireito.className = "col-sm-6 mt-3 mb-3";
    row.appendChild(colunaDireito);
    //graficos linechart
    graficoPieChartEquipaOuJogador(info, colunaDireito, jogador);
}