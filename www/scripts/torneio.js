"use strict";
/**
 * @file Classes para implementar torneio.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Classe Torneio
 */

/**
 * @class Representa um torneio
 * @constructs Torneio
 * @param {number} id - id do torneio
 * @param {string} nome - nome do torneio 
 * @param {Localidade} localidade - localidade do torneio
 * @param {Modalidade} modalidade - modalidade do torneio
 * @param {TipoDeTorneio} tipo - tipo de torneio
 * @param {Date} data - data do torneio
 * @param {Genero} genero - genero(M/F) do torneio
 * @param {string} vencedor - vencedor do torneio
 *
 * @property {number} id - id do torneio
 * @property {string} nome - nome do torneio 
 * @property {Localidade} localidade - localidade do torneio
 * @property {Modalidade} modalidade - modalidade do torneio
 * @property {TipoDeTorneio} tipo - tipo de torneio
 * @property {Date} data - data do torneio
 * @property {Genero} genero - genero(M/F) do torneio
 * @property {Jogador[]} jogadores - jogadores inscritos no torneio
 * @property {Jogo[]} jogos - jogos a realizar no torneio
 * @property {Equipa[]} equipas -  equipas inscritas no torneio
 * @property {Jornada[]} jornadas - jornadas do torneio
 * @property {string} vencedor - vencedor do torneio
 */
function Torneio(id, nome, localidade, modalidade, tipo, data, genero, vencedor) {
    this.id = id;
    this.nome = nome;
    this.localidade = localidade;
    this.modalidade = modalidade;
    this.tipo = tipo;
    this.data = data;
    this.genero = genero;
    this.jogadores = [];
    this.jogos = [];
    this.equipas = [];
    this.jornadas = [];
    this.vencedor = vencedor ? vencedor.toString() : "N/A";
}

/** Métodos de Instância */

/**
 * Função para atribuir identificar jornada de um torneio
 * @param {Jornada[]} jornadas - nova lista de jornadas do torneio
 */
Torneio.prototype.setJornadas = function (jornadas) {
    this.jornadas = jornadas;
};

/**
 * Função para atribuir identificar vencedor de um torneio
 * @param {string} vencedor - novo vencedotr do torneio
 */
Torneio.prototype.setVencedor = function (vencedor) {
    this.vencedor = vencedor;
};

/**
 * Função auxiliar para verificar se existe equipa inscrito no torneio
 * @param {Equipa} equipa - equipa a inscrever no torneio
 * @returns {boolean} resultado True or False
 */
Torneio.prototype.isEquipaExiste = function (equipa) {
    let result = false;
    this.equipas.forEach(function (current) {
        if (current.nome === equipa.nome) {
            result = true;
        }
    });
    return result;
};

/**
 * Função auxiliar para verificar se existe jogador inscrito no torneio
 * @param {Jogador} jogador - jogador a inscrever no torneio
 * @returns {boolean} resultado True or False
 */
Torneio.prototype.isJogadorExiste = function (jogador) {
    let result = false;
    this.jogadores.forEach(function (current) {
        if (current.nome === jogador.nome) {
            result = true;
        }
    });
    return result;
};

/**
 * Função para obter o index da jornada no torneio
 * @param {number} jornadaId - id da jornada * @param {Equipa} equipa - equipa a inscrever no torneio
 * @returns {number} resultado index if true e -1 if false
 */
Torneio.prototype.getJornadaIndex = function (jornadaId) {
    let index = this.jornadas.findIndex(i => i.id === jornadaId);
    return (index !== null || index !== void 0) ? index : -1;
};

/**
 * Classe TorneioTituloIndividual
 */

/**
* @class Representa um torneio por titulo individual
* @constructs TorneioTituloIndividual
* @extends Torneio
* @param {number} id - id do torneio
* @param {string} nome - nome do torneio 
* @param {Localidade} localidade - localidade do torneio
* @param {Modalidade} modalidade - modalidade do torneio
* @param {TipoDeTorneio} tipo - tipo de torneio
* @param {Date} data - data do torneio
* @param {Genero} genero - genero(M/F) do torneio
* @param {string} vencedor - vencedor do torneio
*/
function TorneioTituloIndividual(id, nome, localidade, modalidade, tipo, data, genero, vencedor) {
    Torneio.call(this, id, nome, localidade, modalidade, tipo, data, genero, vencedor);
}
TorneioTituloIndividual.prototype = Object.create(Torneio.prototype);
TorneioTituloIndividual.prototype.constructor = TorneioTituloIndividual;

/**
 * Classe TorneioPorEquipa
 */

/**
* @class Representa um torneio por equipas
* @constructs TorneioPorEquipa
* @extends Torneio
* @param {number} id - id do torneio
* @param {string} nome - nome do torneio 
* @param {Localidade} localidade - localidade do torneio
* @param {Modalidade} modalidade - modalidade do torneio
* @param {TipoDeTorneio} tipo - tipo de torneio
* @param {Date} data - data do torneio
* @param {Genero} genero - genero(M/F) do torneio
* @param {string} vencedor - vencedor do torneio
*/
function TorneioPorEquipa(id, nome, localidade, modalidade, tipo, data, genero, vencedor) {
    Torneio.call(this, id, nome, localidade, modalidade, tipo, data, genero, vencedor);
}
TorneioPorEquipa.prototype = Object.create(Torneio.prototype);
TorneioPorEquipa.prototype.constructor = TorneioPorEquipa;

/**
 * Factory para criar um torneio e retornar o seu objeto do tipo 
 * @param {number} id - id do torneio
 * @param {string} nome - nome do torneio 
 * @param {Localidade} localidade - localidade do torneio
 * @param {Modalidade} modalidade - modalidade do torneio
 * @param {TipoDeTorneio} tipo - tipo de torneio
 * @param {Date} data - data do torneio
 * @param {Genero} genero - genero(M/F) do torneio
 * @param {string} vencedor - vencedor do torneio
 * @returns {Torneio} torneio do tipo individual ou por equipas ou null
 */

function factoryCriarTorneio(id, nome, localidade, modalidade, tipo, data, genero, vencedor) {
    switch (Number(tipo)) {
        case 1://torneio titulo individual
            return new TorneioTituloIndividual(id, nome, localidade, modalidade, tipo, data, genero, vencedor);
        case 2://torneio por equipa
            return new TorneioPorEquipa(id, nome, localidade, modalidade, tipo, data, genero, vencedor);
    }
    return null;
}

/**
 * Função para mostrar a lista de torneios
 * @param {number} tipoId - id do tipo de torneio
 * @param {HTMLElement} info - element html para visualizar info
 */
function mostrarTabelaTorneios(tipoId, info) {

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

    let divCriarNovoTorneio = document.createElement("div");
    divCriarNovoTorneio.style = "float:right;";
    header.appendChild(divCriarNovoTorneio);

    let img = document.createElement("img");
    img.src = "./images/plus.png";
    img.className = "largura altura";
    divCriarNovoTorneio.appendChild(img);

    let btnCriar = document.createElement("a");
    btnCriar.className = "ml-1";
    btnCriar.style = "cursor:pointer;font-weight:bold;";
    btnCriar.appendChild(document.createTextNode("Criar Novo Torneio"));
    btnCriar.onclick = function () {
        criarNovoTorneio(tipoId, info);
    };
    divCriarNovoTorneio.appendChild(btnCriar);

    let h4 = document.createElement("h4");
    h4.className = "title left";
    h4.appendChild(document.createTextNode("Lista de Torneios"));
    header.appendChild(h4);

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");
    table.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let torneioHead = ["Nome", "Localidade", "Modalidade", "Torneio", "Genero", "Data", "Vencedor", "Operações"];
    let thead = tableHead(torneioHead);
    table.appendChild(thead);

    let tbody = tbodyTableTorneio(info);
    table.appendChild(tbody);

    loadDatatable(table.id);
}

/**
 * Função para criar o corpo da tabela do torneio
 * @param {HTMLElement} info - element html para visualizar info
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableTorneio(info) {
    let tbody = document.createElement("tbody");
    info.torneios.forEach(function (torneio) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(torneio.nome));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(info.getNomeLocalidade(torneio.localidade)));
            tr.appendChild(td3);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(info.getNomeModalidade(torneio.modalidade)));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(info.getNomeTipoTorneio(torneio.tipo)));
            tr.appendChild(td5);
            //criar coluna 6
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(info.getTipoGenero(torneio.genero)));
            tr.appendChild(td6);
            //criar coluna 7
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(torneio.data));
            tr.appendChild(td7);
            //criar coluna 8
            let td8 = document.createElement("td");
            td8.appendChild(document.createTextNode(torneio.vencedor));
            tr.appendChild(td8);
            //criar coluna 10
            let td9 = document.createElement("td");
            tr.appendChild(td9);
            //link btnDetalhes 
            let btnDetalhes = document.createElement("a");
            btnDetalhes.setAttribute("id", torneio.id);
            btnDetalhes.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnDetalhes.className = "mr-2";
            btnDetalhes.appendChild(document.createTextNode("Detalhes"));
            btnDetalhes.onclick = function () {
                info.detalhesTorneio(torneio);
            };
            td9.appendChild(btnDetalhes);
            //link btnEditar 
            let btnEditar = document.createElement("a");
            btnEditar.setAttribute("id", torneio.id);
            btnEditar.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnEditar.className = "mr-2";
            btnEditar.appendChild(document.createTextNode("Editar"));
            btnEditar.onclick = function () {
                let confirm = window.confirm("Deseja editar os dados de " + torneio.nome + "?");
                if (confirm === true) {
                    editarTorneio(Number(torneio.id), info);
                } else {
                    showSnackBar("Foi cancelada a edição dos dados de " + torneio.nome, 2000);
                }
            };
            td9.appendChild(btnEditar);
            //link btnRemover
            let btnRemover = document.createElement("a");
            btnRemover.setAttribute("id", torneio.id);
            btnRemover.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnRemover.appendChild(document.createTextNode("Remover"));
            btnRemover.onclick = function () {
                let confirm = window.confirm("Deseja remover " + torneio.nome + "?");
                if (confirm === true) {
                    info.removerTorneio(Number(torneio.id));
                } else {
                    showSnackBar("Foi cancelada a remoção de " + torneio.nome, 2000);
                }
            };
            td9.appendChild(btnRemover);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

/**
 * Função para criar novo torneio
 * @param {number} tipoId - id do tipo de torneio
 * @param {HTMLElement} info - element html para visualizar info
 */
function criarNovoTorneio(tipoId, info) {
    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    document.getElementById("divFormularioTorneio").style.display = "block";
    document.getElementById("formTorneio").reset();//limpar formulario
    document.getElementById("formTorneio").action = "javascript:info.processarTorneio('create');";

    let localidade = document.getElementById("localidadeTorneio");
    localidade.options[0] = new Option("");
    for (let i = 0; i < info.localidades.length; i++) {
        localidade.options[i + 1] = new Option(info.localidades[i].nome, info.localidades[i].id);
    }

    let genero = document.getElementById("generoTorneio");
    genero.options[0] = new Option("");
    for (let i = 0; i < info.generos.length; i++) {
        genero.options[i + 1] = new Option(info.generos[i].tipo, info.generos[i].id);
    }

    let modalidade = document.getElementById("modalidadeTorneio");
    modalidade.options[0] = new Option("");
    for (let i = 0; i < info.modalidades.length; i++) {
        modalidade.options[i + 1] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
    }

    let tipo = document.getElementById("tiposdetorneio");
    for (let i = 0; i < info.tiposDeTorneio.length; i++) {
        if (info.tiposDeTorneio[i].id === tipoId) {
            tipo.options[i] = new Option(info.tiposDeTorneio[i].nome, info.tiposDeTorneio[i].id);
            document.getElementById("tiposdetorneio").selectedIndex = i;
        }
    }
}

/**
 * Função para editar os dados de um torneio
 * @param {number} id - id do torneio a editar
 * @param {HTMLElement} info - element html para visualizar info
 */
function editarTorneio(id, info) {
    let index = info.getTorneioIndex(id);
    if (index !== -1) {
        let torneio = info.torneios[index];
        document.getElementById("idTorneio").value = torneio.id;
        document.getElementById("nomeTorneio").value = torneio.nome;
        document.getElementById("dataTorneio").value = torneio.data;
        document.getElementById("vencedor").value = torneio.vencedor;

        let localidadeId = torneio.localidade;
        for (let i = 0; i < info.localidades.length; i++) {
            document.getElementById("localidadeTorneio").options[i] = new Option(info.localidades[i].nome, info.localidades[i].id);
            if (info.localidades[i].id === localidadeId) {
                document.getElementById("localidadeTorneio").selectedIndex = i;
            }
        }

        let generoId = torneio.genero;
        for (let i = 0; i < info.generos.length; i++) {
            document.getElementById("generoTorneio").options[i] = new Option(info.generos[i].tipo, info.generos[i].id);
            if (info.generos[i].id === generoId) {
                document.getElementById("generoTorneio").selectedIndex = i;
            }
        }

        let tiposDeTorneioId = torneio.tipo;
        for (let i = 0; i < info.tiposDeTorneio.length; i++) {
            if (info.tiposDeTorneio[i].id === tiposDeTorneioId) {
                document.getElementById("tiposdetorneio").options[i] = new Option(info.tiposDeTorneio[i].nome, info.tiposDeTorneio[i].id);
                document.getElementById("tiposdetorneio").selectedIndex = i;
            }
        }

        let modalidadeId = torneio.modalidade;
        for (let i = 0; i < info.modalidades.length; i++) {
            document.getElementById("modalidadeTorneio").options[i] = new Option(info.modalidades[i].nome, info.modalidades[i].id);
            if (info.modalidades[i].id === modalidadeId) {
                document.getElementById("modalidadeTorneio").selectedIndex = i;
            }
        }

        let divCentral = document.getElementById(info.id);
        limparDiv(divCentral);

        document.getElementById("divFormularioTorneio").style.display = "block";
        document.getElementById("formTorneio").action = "javascript:info.processarTorneio('update');";
    }
}


/**
 * Função para visualizar dados de um torneio
 * @param {*} torneio 
 * @param {*} info 
 */
function detalhesTorneio(torneio, info, tipo) {

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

    if (torneio.tipo === 1) {//jogadores
        h4.appendChild(document.createTextNode("Dados de " + torneio.nome + " - " + info.getNomeModalidade(torneio.modalidade)));
    } else if (torneio.tipo === 2) {//equipas
        h4.appendChild(document.createTextNode("Dados de " + torneio.nome + " - " + info.getNomeModalidade(torneio.modalidade)));
    }

    //button cancelar
    let btnCancelar = document.createElement("a");
    btnCancelar.className = "btn btn-primary btn-sm w-auto text-white ml-3";
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    btnCancelar.onclick = function () {
        let msg = (torneio.tipo === 1) ? "individual" : "equipa";
        info.getTorneiosPorTipo(msg);
    }
    h4.appendChild(btnCancelar);

    //button ir para simulação
    let btnSimular = document.createElement("a");
    btnSimular.className = "btn btn-primary btn-sm w-auto text-white ml-3";
    btnSimular.appendChild(document.createTextNode("Simular Torneio"));
    btnSimular.onclick = function () {
        if (torneio.tipo === 1) {
            //vai buscar as jogadores no torneio individual
            info.getJogadoresNoTorneio(Number(torneio.id), "visualizar", tipo);
        } else if (torneio.tipo === 2) {
            //vai buscar as equipas no torneio de equipas
            info.getEquipasNoTorneio(Number(torneio.id), "visualizar", tipo);
        }
    }
    h4.appendChild(btnSimular);

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "tabelaClassificacao");
    table.className = "table table-hover table-striped table-bordered w-100 responsive nowrap";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let titulo = ["", "Nome", "PTS", "V", "E", "D", "GM", "GS", "Vencedor"];
    let thead = tableHead(titulo);
    table.appendChild(thead);
    //
    let tbody = tbodyTableDadosTorneio(torneio);
    table.appendChild(tbody);

    //mostrar graficos
    mostrarGraficoTorneio(info,torneio);
}

/**
 * Função para criar corpo da tabela e mostrar equipas ou jogadore no torneio
 * @param {Torneio} torneio - torneio a listar jogadores ou equipas
 * @param {string} acao - a acao a executar
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableDadosTorneio(torneio) {
    let tbody = document.createElement("tbody");
    let lista = [];
    if (torneio.tipo === 1) {//jogadores
        lista = torneio.jogadores;
    } else if (torneio.tipo === 2) {//equipas
        lista = torneio.equipas;
    }

    //faz o loop
    for (let i = 0; i < lista.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 0
            let td0 = document.createElement("td");
            td0.appendChild(document.createTextNode(i + 1));
            tr.appendChild(td0);
            //criar coluna 1
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(lista[i].nome));
            tr.appendChild(td1);
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(lista[i].pontos));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(lista[i].vitorias));
            tr.appendChild(td3);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(lista[i].empates));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(lista[i].derrotas));
            tr.appendChild(td5);
            //criar coluna 6
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(lista[i].marcados));
            tr.appendChild(td6);
            //criar coluna 7
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(lista[i].sofridos));
            tr.appendChild(td7);
            //criar coluna 8
            let td8 = document.createElement("td");
            tr.appendChild(td8);
            if (torneio.vencedor === lista[i].nome) {
                let img = document.createElement("img");
                img.setAttribute("id", "imagemTaca");
                img.src = "./images/taca.jpg";
                img.style.width = "20px";
                img.style.height = "30px";
                td8.appendChild(img);
                //alterar a cor da primeira tabela com a classe base e classificacao
                document.getElementById("tabelaClassificacao").className = "table table-hover table-striped table-bordered w-100 responsive nowrap classificacao";
            }
        }
        tbody.appendChild(tr);
    }
    return tbody;
}


/**
 * Função para mostrar os torneios disponiveis
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarTorneioDisponiveis(info) {

    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let container = document.createElement("div");
    container.className = "container container-div";
    divCentral.appendChild(container);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Calendário de torneios"));
    container.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    //foreach
    for (let i in info.torneios) {
        //tamanho coluna
        let col = document.createElement("div");
        col.className = "col-md-4 col-sm-6 col-12 mt-3";
        row.appendChild(col);
        //card
        let card = document.createElement("div");
        card.className = "card bg-secondary";
        col.appendChild(card);
        //card-body
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        //card-titulo
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.style.fontSize = "1.2rem";
        cardBody.appendChild(h5);
        h5.appendChild(document.createTextNode(info.torneios[i].nome + " " + info.getTipoGenero(info.torneios[i].genero)));
        //button
        let a = document.createElement("a");
        a.className = "btn btn-dark btn-sm w-auto text-white";
        a.style = "float:right; hover: red;";
        a.appendChild(document.createTextNode("Inscrição"));
        a.onclick = function () {
            if (info.torneios[i].tipo === 1) {//jogadores
                info.getJogadores("inscreverJogador", info.torneios[i]);
            } else if (info.torneios[i].tipo === 2) {//equipas
                info.getEquipas("inscreverEquipa", info.torneios[i]);
            }
        };
        h5.appendChild(a);
        //subtitulo
        let h6 = document.createElement("h6");
        h6.className = "card-title";
        cardBody.appendChild(h6);
        //imagem
        let img = document.createElement("img");
        img.src = "./images/calendario.png";
        img.style = "height:50px;width:50px;";
        img.className = "mr-3";
        h6.appendChild(img);
        h6.appendChild(document.createTextNode(info.torneios[i].data));
        //texto 
        let p = document.createElement("p");
        p.className = "card-text";
        p.appendChild(document.createTextNode(info.getNomeModalidade(info.torneios[i].modalidade) + " - " + info.getNomeLocalidade(info.torneios[i].localidade)));
        cardBody.appendChild(p);
    }
}

/**
 * Função mostrar formulario para inscrever jogador ou equipa
 * @param {Torneio} torneio - torneio para inscrever jogadores ou equipas
 * @param {HTMLElement} info - element html para visualizar info 
 */
function formInscreverNoTorneio(torneio, info) {
    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let divForm = document.createElement("div");
    divForm.setAttribute("id", "divInscreverNoTorneio");
    divCentral.appendChild(divForm);

    let h5 = document.createElement("h5");
    h5.appendChild(document.createTextNode("Inscrição no " + torneio.nome + " " + info.getTipoGenero(torneio.genero)));
    divForm.appendChild(h5);

    let card = document.createElement("div");
    card.className = "card mt-3 card-form";
    divForm.appendChild(card);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body-width";
    card.appendChild(cardBody);

    let h6 = document.createElement("h6");
    h6.className = "card-title";
    cardBody.appendChild(h6);
    //imagem
    let img = document.createElement("img");
    img.src = "./images/calendario.png";
    img.style = "height:50px;width:50px;";
    img.className = "mr-3";
    h6.appendChild(img);
    h6.appendChild(document.createTextNode(torneio.data + " "));
    h6.appendChild(document.createTextNode(info.getNomeModalidade(torneio.modalidade) + " " + info.getTipoGenero(torneio.genero) + " "));
    h6.appendChild(document.createTextNode(info.getNomeLocalidade(torneio.localidade)));

    let form = document.createElement("form");
    form.setAttribute("id", "formInscricaoTorneio");
    form.className = "ml-3 mt-2";
    cardBody.appendChild(form);

    let divInscricao = document.createElement("div");
    divInscricao.className = "form-group row";
    form.appendChild(divInscricao);

    //se for individual, permite inscrever jogador
    if (torneio.tipo === 1) {
        let labelJogador = document.createElement("label");
        labelJogador.for = "equipaTorneio";
        labelJogador.className = "col-sm-4 col-form-label";
        labelJogador.appendChild(document.createTextNode("Jogador"));
        divInscricao.appendChild(labelJogador);

        let colunaJogador = document.createElement("div");
        colunaJogador.className = "col-sm-8";
        divInscricao.appendChild(colunaJogador);

        //criar lista de jogadores
        let jogadores = document.createElement("select");
        jogadores.setAttribute("id", "jogadorTorneio");
        jogadores.className = "form-control";
        colunaJogador.appendChild(jogadores);
        //por modalidades e depois genero
        for (let i = 0; i < info.jogadores.length; i++) {
            if (info.jogadores[i].modalidade.id === torneio.modalidade.id) {
                jogadores.options[i] = new Option(info.jogadores[i].nome, info.jogadores[i].id);
            }
        }
        //se for por equipa, permite inscrever equipa
    } else if (torneio.tipo === 2) {
        let labelEquipa = document.createElement("label");
        labelEquipa.for = "equipaTorneio";
        labelEquipa.className = "col-sm-4 col-form-label";
        labelEquipa.appendChild(document.createTextNode("Equipa"));
        divInscricao.appendChild(labelEquipa);

        let colunaEquipa = document.createElement("div");
        colunaEquipa.className = "col-sm-8";
        divInscricao.appendChild(colunaEquipa);

        //criar lista de equipas
        let equipas = document.createElement("select");
        equipas.setAttribute("id", "equipaTorneio");
        equipas.className = "form-control";
        colunaEquipa.appendChild(equipas);
        for (let i = 0; i < info.equipas.length; i++) {
            if (info.equipas[i].modalidade.id === torneio.modalidade.id) {
                equipas.options[i] = new Option(info.equipas[i].nome, info.equipas[i].id);
            }
        }
    }

    let divButton = document.createElement("div");
    divButton.className = "form-group row";
    form.appendChild(divButton);

    let divCol4 = document.createElement("div");
    divCol4.className = "col-sm-4";
    divButton.appendChild(divCol4);

    let divCol8 = document.createElement("div");
    divCol8.className = "col-sm-8";
    divButton.appendChild(divCol8);

    let btnSave = document.createElement("a");
    btnSave.className = "btn btn-outline-success btn-sm w-50 mr-2";
    btnSave.appendChild(document.createTextNode("Guardar"));
    divCol8.appendChild(btnSave);
    btnSave.onclick = function () {
        if (torneio.tipo === 1) {
            inscreverJogador(torneio, info);
        } else if (torneio.tipo === 2) {
            inscreverEquipa(torneio, info);
        }
    }

    //button cancelar
    let btnCancelar = document.createElement("a");
    btnCancelar.className = "btn btn-outline-danger btn-sm w-50";
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    divCol8.appendChild(btnCancelar);
    btnCancelar.onclick = function () {
        info.showTorneiosDisponiveis();
    }
}

/**
 * Função para inscrever equipa no torneio
 * @param {Torneio} torneio - torneio a receber inscrições das equipas
 * @param {HTMLElement} info - element html para visualizar info 
 */
function inscreverEquipa(torneio, info) {
    let equipaList = document.getElementById("equipaTorneio");
    let equipaId = equipaList.options[equipaList.selectedIndex].value;
    let equipaIndex = info.getEquipaIndex(Number(equipaId));
    if (equipaIndex !== -1) {
        if (info.getNomeModalidade(torneio.modalidade) === info.getNomeModalidade(info.equipas[equipaIndex].modalidade)) {
            if (torneio.isEquipaExiste(info.equipas[equipaIndex]) === true) {
                showSnackBar(obterAcronimo(info.equipas[equipaIndex].nome) + " já existe no " + torneio.nome + ".\nAdiciona outra equipa.", 2000);
            } else {
                info.inscreverEquipaNoTorneio(torneio, info.equipas[equipaIndex]);
            }
        } else if (info.getTipoGenero(torneio.genero) === "M/F") {//modalidade for mista
            if (torneio.isEquipaExiste(info.equipas[equipaIndex]) === true) {
                showSnackBar(obterAcronimo(info.equipas[equipaIndex].nome) + " já existe no " + torneio.nome + ".\nAdiciona outra equipa.", 2000);
            } else {
                info.inscreverEquipaNoTorneio(torneio, info.equipas[equipaIndex]);
            }
        } else {
            showSnackBar("A equipa " + obterAcronimo(info.equipas[equipaIndex].nome) + " não foi inscrito porque a modalidade é diferente.", 2000);
        }
    }
}

/**
 * Função para inscrever jogador no torneio
 * @param {Torneio} torneio - torneio a receber inscrições dos jogadores 
 * @param {HTMLElement} info - element html para visualizar info 
 */
function inscreverJogador(torneio, info) {
    let jogadorList = document.getElementById("jogadorTorneio");
    let jogadorId = jogadorList.options[jogadorList.selectedIndex].value;
    let jogadorIndex = info.getJogadorIndex(Number(jogadorId));
    if (jogadorIndex !== -1) {
        if (info.getNomeModalidade(torneio.modalidade) === info.getNomeModalidade(info.jogadores[jogadorIndex].modalidade)) {//somente para jogadores com mesma modalidade
            if (torneio.isJogadorExiste(info.jogadores[jogadorIndex]) === true) {
                showSnackBar(info.jogadores[jogadorIndex].nome + " já existe no " + torneio.nome + ".\nAdiciona outro Jogador.", 3000);
            } else {
                info.inscreverJogadorNoTorneio(torneio, info.jogadores[jogadorIndex]);
            }
        } else if (info.getTipoGenero(torneio.genero) === "M/F") {//modalidade for mista
            if (torneio.isJogadorExiste(info.jogadores[jogadorIndex]) === true) {
                showSnackBar(info.jogadores[jogadorIndex].nome + " já existe no " + torneio.nome + ".\nAdiciona outro Jogador.", 3000);
            } else {
                info.inscreverJogadorNoTorneio(torneio, info.jogadores[jogadorIndex]);
            }
        } else {
            showSnackBar("O jogador " + info.jogadores[jogadorIndex].id + " não foi inscrito porque a modalidade é diferente.", 3000);
        }
    }
}

/**
 * Função para mostrar jornada e estatistica do torneio 
 * @param {HTMLElement} info - element html para visualizar info 
 */
function visualizarEstatisticaTorneio(info) {

    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let container = document.createElement("div");
    container.className = "container container-div";
    divCentral.appendChild(container);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Lista de torneios"));
    container.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    //foreach
    for (let i in info.torneios) {
        //tamanho coluna
        let col = document.createElement("div");
        col.className = "col-md-4 col-sm-6 col-12 mt-3";
        row.appendChild(col);
        //card
        let card = document.createElement("div");
        card.className = "card bg-secondary";
        col.appendChild(card);
        //card-body
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        //card-titulo
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.style.fontSize = "1.2rem";
        cardBody.appendChild(h5);
        h5.appendChild(document.createTextNode(info.torneios[i].nome + " " + info.getTipoGenero(info.torneios[i].genero)));
        //button
        let a = document.createElement("a");
        a.className = "btn btn-dark btn-sm w-auto text-white";
        a.style = "float:right;";
        a.appendChild(document.createTextNode("Estatistica"));
        a.onclick = function () {
            //jogadores
            if (info.torneios[i].tipo === 1) {
                //vai buscar as jogadores no torneio individual
                info.getJogadoresNoTorneio(info.torneios[i].id, "estatisticaTorneio");
            }//equipas
            else if (info.torneios[i].tipo === 2) {
                //vai buscar as equipas no torneio de equipas
                info.getEquipasNoTorneio(info.torneios[i].id, "estatisticaTorneio");
            }
        };
        h5.appendChild(a);
        //subtitulo
        let h6 = document.createElement("h6");
        h6.className = "card-title";
        cardBody.appendChild(h6);
        //imagem
        let img = document.createElement("img");
        img.src = "./images/calendario.png";
        img.style = "height:50px;width:50px;";
        img.className = "mr-3";
        h6.appendChild(img);
        h6.appendChild(document.createTextNode(info.torneios[i].data));
        //texto 
        let p = document.createElement("p");
        p.className = "card-text";
        p.appendChild(document.createTextNode(info.getNomeModalidade(info.torneios[i].modalidade) + " - " + info.getNomeLocalidade(info.torneios[i].localidade)));
        cardBody.appendChild(p);
    }
}

/**
 * Função para visualizar estatistica de um Torneio
 * @param {Torneio} torneio - torneio a visualizar estatistica 
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {string} acao - tipo de acção e executar 
 */
function visualizarTorneio(torneio, info, acao, tipo) {
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

    if (torneio.tipo === 1) {//jogadores
        h4.appendChild(document.createTextNode("Lista de Jogadores no " + torneio.nome + " - " + info.getNomeModalidade(torneio.modalidade)));
    } else if (torneio.tipo === 2) {//equipas
        h4.appendChild(document.createTextNode("Lista de Equipas no " + torneio.nome + " - " + info.getNomeModalidade(torneio.modalidade)));
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

    let titulo = ["", "Nome", "PTS", "V", "E", "D", "GM", "GS", ""];
    let thead = tableHead(titulo);
    table.appendChild(thead);
    //
    let tbody = tbodyTableEquipaJogadorTorneio(torneio, acao);
    table.appendChild(tbody);
    //mostrar jornadas
    mostrarJornadas(torneio, info, tipo);
}

/**
 * Função para criar corpo da tabela e mostrar equipas ou jogadore no torneio
 * @param {Torneio} torneio - torneio a listar jogadores ou equipas
 * @param {string} acao - a acao a executar
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableEquipaJogadorTorneio(torneio, acao) {
    let tbody = document.createElement("tbody");
    let lista = [];
    if (torneio.tipo === 1) {//jogadores
        lista = torneio.jogadores;
    } else if (torneio.tipo === 2) {//equipas
        lista = torneio.equipas;
    }
    if (acao === "resetar") {
        torneio.vencedor = "N/A";
        reiniciarEstatistica(lista);
    }
    //faz o loop
    for (let i = 0; i < lista.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 0
            let td0 = document.createElement("td");
            td0.appendChild(document.createTextNode(i + 1));
            tr.appendChild(td0);
            //criar coluna 1
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(lista[i].nome));
            tr.appendChild(td1);
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(lista[i].pontos));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(lista[i].vitorias));
            tr.appendChild(td3);
            //criar coluna 4
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(lista[i].empates));
            tr.appendChild(td4);
            //criar coluna 5
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(lista[i].derrotas));
            tr.appendChild(td5);
            //criar coluna 6
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(lista[i].marcados));
            tr.appendChild(td6);
            //criar coluna 7
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(lista[i].sofridos));
            tr.appendChild(td7);
            //criar coluna 8
            let td8 = document.createElement("td");
            tr.appendChild(td8);
            if (torneio.vencedor === lista[i].nome) {
                let img = document.createElement("img");
                img.setAttribute("id", "imagemTaca");
                img.src = "./images/taca.jpg";
                img.style.width = "20px";
                img.style.height = "30px";
                td8.appendChild(img);
                //alterar a cor da primeira tabela com a classe base e classificacao
                document.getElementById("tabelaClassificacao").className = "table table-hover table-striped table-bordered w-100 responsive nowrap classificacao";
            }
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
 * Função para reiniciar os valores da estatistica do jogo
 * @param {object[]} lista - objeto do tipo array
 */
function reiniciarEstatistica(lista) {
    lista.forEach(function (current) {
        current.marcados = 0;
        current.sofridos = 0;
        current.pontos = 0;
        current.vitorias = 0;
        current.empates = 0;
        current.derrotas = 0;
    });
}

/**
 * Função para mostrar dados do torneio pela modalidade
 * @param {number} modalidadeId - id da modalidade
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarTorneioPorModalidade(modalidadeId, info, tipo) {

    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    let container = document.createElement("div");
    container.className = "container container-div";
    divCentral.appendChild(container);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Lista de torneios por modalidade - " + info.getNomeModalidade(modalidadeId)));
    container.appendChild(h3);

    let row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    //tamanho coluna esquerda
    let colEsquerdo = document.createElement("div");
    colEsquerdo.className = "col-sm-6 mt-3";
    row.appendChild(colEsquerdo);

    //inscrição
    for (let i in info.torneios) {
        if (info.torneios[i].modalidade === modalidadeId) {
            //card
            let card = document.createElement("div");
            card.className = "card bg-secondary mb-3";
            colEsquerdo.appendChild(card);
            //card-body
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            card.appendChild(cardBody);
            //card-titulo
            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.style.fontSize = "1.2rem";
            cardBody.appendChild(h5);
            h5.appendChild(document.createTextNode(info.torneios[i].nome + " " + info.getTipoGenero(info.torneios[i].genero)));
            //button
            let a = document.createElement("a");
            a.className = "btn btn-dark btn-sm w-auto text-white";
            a.style = "float:right;";
            a.appendChild(document.createTextNode("Detalhes"));
            a.onclick = function () {
                if (info.torneios[i].tipo === 1) {
                    //vai buscar as jogadores no torneio individual
                    info.getJogadoresNoTorneio(Number(info.torneios[i].id), "visualizar", tipo);
                } else if (info.torneios[i].tipo === 2) {
                    //vai buscar as equipas no torneio de equipas
                    info.getEquipasNoTorneio(Number(info.torneios[i].id), "visualizar", tipo);
                }
            };
            h5.appendChild(a);
            //subtitulo
            let h6 = document.createElement("h6");
            h6.className = "card-title";
            cardBody.appendChild(h6);
            //imagem
            let img = document.createElement("img");
            img.src = "./images/calendario.png";
            img.style = "height:50px;width:50px;";
            img.className = "mr-3";
            h6.appendChild(img);
            h6.appendChild(document.createTextNode(info.torneios[i].data));
            //texto 
            let p = document.createElement("p");
            p.className = "card-text";
            p.appendChild(document.createTextNode(info.getNomeModalidade(info.torneios[i].modalidade) + " - " + info.getNomeLocalidade(info.torneios[i].localidade)));
            cardBody.appendChild(p);
        }
    }

    //tamanho coluna direito
    let colunaDireito = document.createElement("div");
    colunaDireito.className = "col-sm-6 mt-3";
    row.appendChild(colunaDireito);

    //estatistica
    for (let i in info.torneios) {
        if (info.torneios[i].modalidade === modalidadeId) {
            //card
            let card = document.createElement("div");
            card.className = "card bg-secondary mb-3";
            colunaDireito.appendChild(card);
            //card-body
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            card.appendChild(cardBody);
            //card-titulo
            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.style.fontSize = "1.2rem";
            cardBody.appendChild(h5);

            h5.appendChild(document.createTextNode(info.torneios[i].nome + " " + info.getTipoGenero(info.torneios[i].genero)));
            //button
            let a = document.createElement("a");
            a.className = "btn btn-dark btn-sm w-auto text-white";
            a.style = "float:right;";
            a.appendChild(document.createTextNode("Estatistica"));
            a.onclick = function () {
                if (info.torneios[i].tipo === 1) {
                    //vai buscar as jogadores no torneio individual
                    info.getJogadoresNoTorneio(Number(info.torneios[i].id), "estatisticaTorneio", tipo);
                } else if (info.torneios[i].tipo === 2) {
                    //vai buscar as equipas no torneio de equipas
                    info.getEquipasNoTorneio(Number(info.torneios[i].id), "estatisticaTorneio", tipo);
                }
            };
            h5.appendChild(a);
            //subtitulo
            let h6 = document.createElement("h6");
            h6.className = "card-title";
            cardBody.appendChild(h6);
            //imagem
            let img = document.createElement("img");
            img.src = "./images/calendario.png";
            img.style = "height:50px;width:50px;";
            img.className = "mr-3";
            h6.appendChild(img);
            h6.appendChild(document.createTextNode(info.torneios[i].data));
            //texto 
            let p = document.createElement("p");
            p.className = "card-text";
            p.appendChild(document.createTextNode(info.getNomeModalidade(info.torneios[i].modalidade) + " - " + info.getNomeLocalidade(info.torneios[i].localidade)));
            cardBody.appendChild(p);
        }
    }
}

/**
 * Função para mostrar jornadas
 * @param {Torneio} torneio - torneio para gerar e listar jornadas
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarJornadas(torneio, info, tipo) {
    var divJornada = document.createElement("div");
    divJornada.id = "divJornada";

    let h4 = document.createElement("h4");
    h4.className = "title left mt-3 mb-3";
    h4.style.textDecoration = "underline";
    h4.appendChild(document.createTextNode("Calendarios dos Jogos"));
    divJornada.appendChild(h4);

    //button simular
    let btnSimular = document.createElement("a");
    btnSimular.className = "btn btn-primary btn-sm w-auto text-white ml-3";
    btnSimular.appendChild(document.createTextNode("Simular"));
    h4.appendChild(btnSimular);
    btnSimular.onclick = function () {
        simularTorneio(torneio, info, tipo);
    }

    //button resetar
    let btnResetar = document.createElement("a");
    btnResetar.className = "btn btn-primary btn-sm w-auto text-white ml-2";
    btnResetar.appendChild(document.createTextNode("Resetar"));
    h4.appendChild(btnResetar);
    btnResetar.onclick = function () {
        resetarTorneio(torneio, info, tipo);
    }

    //button estatistica
    let btnEstatistica = document.createElement("a");
    btnEstatistica.className = "btn btn-primary btn-sm w-auto text-white ml-2";
    btnEstatistica.appendChild(document.createTextNode("Estatistica"));
    h4.appendChild(btnEstatistica);
    btnEstatistica.onclick = function () {
        //jogadores
        if (torneio.tipo === 1) {
            //vai buscar as jogadores no torneio individual
            info.getJogadoresNoTorneio(torneio.id, "estatisticaTorneio", tipo);
        }//equipas
        else if (torneio.tipo === 2) {
            //vai buscar as equipas no torneio de equipas
            info.getEquipasNoTorneio(torneio.id, "estatisticaTorneio", tipo);
        }
    }

    //button cancelar
    let btnCancelar = document.createElement("a");
    btnCancelar.className = "btn btn-primary btn-sm w-auto text-white ml-2";
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    h4.appendChild(btnCancelar);
    btnCancelar.onclick = function () {
        if (tipo === "torneio") {
            info.detalhesTorneio(torneio);
        } else if (tipo === "modalidade") {
            info.getTorneioPorModalidade(info.getNomeModalidade(torneio.modalidade));
        }
    }

    let divCentral = document.getElementById(info.id);
    divCentral.appendChild(divJornada);
    //verificar se existe 
    if (torneio.tipo === 1) {//jogadores
        agruparJogadores(torneio);
    } else if (torneio.tipo === 2) {//equipas
        agruparEquipas(torneio);
    }
    //cria jornadas
    criarJornada(divJornada, torneio);
}

/**
 * Função para agrupar jogadores a dois(par) para gerar jornada
 * @param {Torneio} torneio - torneio a ser configurado, caso, o numero de jogadores seja par e maior que zero
 */
function agruparJogadores(torneio) {
    if (torneio.jogadores.length > 0) {
        if ((torneio.jogadores.length % 2) === 0) {
            configurarTorneio(torneio);
        } else {
            showSnackBar("Não é possivel gerar a jornada porque o numero total de jogadores, tem que ser par.", 2000);
        }
    } else {
        showSnackBar("Não é possivel gerar a jornada porque não há jogadores inscrita no " + torneio.nome, 2000);
    }
}

/**
 * Função para agrupar equipas a dois(par) para gerar jornada
 @param {Torneio} torneio - torneio a ser configurado, caso, o numero de equipas seja par e maior que zero
 */
function agruparEquipas(torneio) {
    if (torneio.equipas.length > 0) {
        if ((torneio.equipas.length % 2) === 0) {
            configurarTorneio(torneio);
        } else {
            showSnackBar("Não é possivel gerar a jornada porque o numero total de equipas, tem que ser par.", 2000);
        }
    } else {
        showSnackBar("Não é possivel gerar a jornada porque não há equipas inscrita no " + torneio.nome, 2000);
    }
}

/**
 * Função para criar jornadas da 1ª e 2ª volta
 * @param {HTMLElement}  divJornada - elemento HTML que representa a div jornada
 * @param {Torneio} torneio - torneio a gerar jornada
 */
function criarJornada(divJornada, torneio) {
    let div = document.createElement("div");
    div.className = "content table-responsive table-full-width";
    divJornada.appendChild(div);
    torneio.jornadas.forEach(function (jornada) {
        div.appendChild(criarJornadaParaTorneio(jornada));
    });
}

/**
 * Função para simular torneio e definir vencedor
 * @param {Torneio} torneio - torneio a simular os resultados e definir vencedor
 * @param {HTMLElement} info - element html para visualizar info 
 */
function simularTorneio(torneio, info, tipo) {
    let maxGolo = 5;
    let minGolo = 0;
    let contador = 1;
    torneio.jornadas.forEach(function (jornada) {
        jornada.jogos.forEach(function (jogo) {
            if (jogo.jornada.id === jornada.id) {
                jogo.goloEmCasa = Math.floor(Math.random() * (maxGolo - minGolo + 1)) + minGolo;
                jogo.goloVisitante = Math.floor(Math.random() * (maxGolo - minGolo + 1)) + minGolo;
                jogo.atualizarResultados(info, contador, torneio);
            }
        });
        contador++;
    });
    ordenacaoPorPontos(torneio);
    definirVencedor(torneio, info);
    visualizarTorneio(torneio, info, "visualizar", tipo);
}


/**
 * Função para resetar os valores do torneio
 * @param {Torneio} torneio - torneio para resetar os valores
 * @param {HTMLElement} info - element html para visualizar info 
 */
function resetarTorneio(torneio, info, tipo) {
    torneio.jornadas.forEach(function (jornada) {
        jornada.jogos.forEach(function (jogo) {
            jogo.resetarResultados(torneio);
        });
    });
    visualizarTorneio(torneio, info, "visualizar", tipo);
}

/**
 * Função para definir vencedor
 * @param {Torneio} torneio - definir vencedor deste torneio
 */
function definirVencedor(torneio, info) {
    if (torneio.tipo === 1) {//jogadores
        if (torneio.jogadores.length > 0) {//vencedor é jogador em 1º lugar
            torneio.setVencedor(torneio.jogadores[0].nome);
            //update vencedor do torneio na BD
            info.updateVencedorTorneio(torneio);
        }
    } else if (torneio.tipo === 2) {//equipas
        if (torneio.equipas.length > 0) {//vencedor é equipa em 1º lugar
            torneio.setVencedor(torneio.equipas[0].nome);
            //update vencedor do torneio na BD
            info.updateVencedorTorneio(torneio);
        }
    }
    if (torneio.vencedor !== "N/A") {
        showSnackBar("O vencedor do " + torneio.nome + " é " + torneio.vencedor + ".", 5000);
    }
}




