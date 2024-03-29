"use strict";
/**
 * @file Classes para implementar modalidade.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Classe Modalidade
 */

/**
* @class representa uma modalidade
* @constructs Modalidade
* @param {number} id - id da modalidade
* @param {nome} nome - nome da modalidade
* 
* @property {number} id - id da modalidade
* @property {nome} nome - nome da modalidade
*/
function Modalidade(id, nome) {
    this.id = id;
    this.nome = nome;
}

/**
 * Função para mostrar a lista de modalidades
 * @param {HTMLElement} info - element html para visualizar info 
 */
function mostrarTabelaModalidades(info) {

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

    let divCriarNovaModalidade = document.createElement("div");
    divCriarNovaModalidade.style = "float:right;";
    header.appendChild(divCriarNovaModalidade);

    let img = document.createElement("img");
    img.src = "./images/plus.png";
    img.className = "largura altura";
    divCriarNovaModalidade.appendChild(img);

    let a = document.createElement("a");
    a.className = "ml-1";
    a.style = "cursor:pointer;font-weight:bold;";
    a.appendChild(document.createTextNode("Criar Nova Modalidade"));
    a.onclick = function () {
        criarNovaModalidade(info);
    };
    divCriarNovaModalidade.appendChild(a);

    let h4 = document.createElement("h4");
    h4.className = "title left";
    h4.appendChild(document.createTextNode("Lista de Modalidades"));
    header.appendChild(h4);

    let divTabela = document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    divTabela.className = "content table-responsive table-full-width";
    card.appendChild(divTabela);

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");
    table.className = "table table-hover table-striped table-bordered nowrap";
    table.cellSpacing = 0;
    divTabela.appendChild(table);

    let modalidadeHead = ["Id", "Nome", "Operações"];
    let thead = tableHead(modalidadeHead);
    table.appendChild(thead);

    let tbody = tbodyTableModalidade(info);
    table.appendChild(tbody);

    loadDatatable(table.id);
}

/**
 * Função para criar o corpo da tabela de modalidade
 * @param {HTMLElement} info - element html para visualizar info 
 * @returns {HTMLElement} tbody da tabela
 */
function tbodyTableModalidade(info) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < info.modalidades.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "text-center";
        for (let j = 0; j < 1; j++) {
            //criar coluna 1
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(info.modalidades[i].id));
            tr.appendChild(td1);
            //criar coluna 2
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(info.modalidades[i].nome));
            tr.appendChild(td2);
            //criar coluna 3
            let td3 = document.createElement("td");
            tr.appendChild(td3);
            //link btnDetalhes 
            let btnDetalhes = document.createElement("a");
            btnDetalhes.setAttribute("id", info.modalidades[i].id);
            btnDetalhes.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnDetalhes.className = "mr-2";
            btnDetalhes.appendChild(document.createTextNode("Detalhes"));
            btnDetalhes.onclick = function () {
                visualizarModalidade(info, info.modalidades[i].nome);
            };
            td3.appendChild(btnDetalhes);
            //link btnEditar 
            let btnEditar = document.createElement("a");
            btnEditar.setAttribute("id", info.modalidades[i].id);
            btnEditar.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnEditar.className = "mr-2";
            btnEditar.appendChild(document.createTextNode("Editar"));
            btnEditar.onclick = function () {
                let confirm = window.confirm("Deseja editar os dados da modalidade " + info.modalidades[i].nome + "?");
                if (confirm === true) {
                    editarModalidade(Number(info.modalidades[i].id), info);
                } else {
                    showSnackBar("Foi cancelada a edição dos dados da modalidade " + info.modalidades[i].nome, 2000);
                }
            };
            td3.appendChild(btnEditar);
            //link btnRemover
            let btnRemover = document.createElement("a");
            btnRemover.setAttribute("id", info.modalidades[i].id);
            btnRemover.style = "cursor:pointer;text-decoration:underline;color:blue;";
            btnRemover.appendChild(document.createTextNode("Remover"));
            btnRemover.onclick = function () {
                let confirm = window.confirm("Deseja remover a modalidade " + info.modalidades[i].nome + "?");
                if (confirm === true) {
                    info.removerModalidade(Number(info.modalidades[i].id));
                } else {
                    showSnackBar("Foi cancelada a remoção da modalidade " + info.modalidades[i].nome, 2000);
                }
            };
            td3.appendChild(btnRemover);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

/**
 * Função para criar nova modalidade
 * @param {HTMLElement} info - element html para visualizar info
 */
function criarNovaModalidade(info) {
    let divCentral = document.getElementById(info.id);
    limparDiv(divCentral);

    document.getElementById("divFormularioModalidade").style.display = "block";
    document.getElementById("formModalidade").reset();//limpar formulario
    document.getElementById("formModalidade").action = "javascript:info.processarModalidade('create');";
}

/**
 * Função para editar os dados de uma modalidade
 * @param {number} id - id da modalidade
 * @param {HTMLElement} info - element html para visualizar info
 */
function editarModalidade(id, info) {
    let index = info.getModalidadeIndex(id);
    if (index !== -1) {
        let modalidade = info.modalidades[index];
        document.getElementById("idModalidade").value = modalidade.id;
        document.getElementById("momeModalidade").value = modalidade.nome;

        let divCentral = document.getElementById(info.id);
        limparDiv(divCentral);

        document.getElementById("divFormularioModalidade").style.display = "block";
        document.getElementById("formModalidade").action = "javascript: info.processarModalidade('update')";
    }
}

/**
 * Função para visualizar torneios por modalidade
 * @param {HTMLElement} info - element html para visualizar info 
 * @param {string} nomeModalidade - nome da modalidade 
 */
function visualizarModalidade(info, nomeModalidade) {
    if (nomeModalidade !== undefined) {
        info.getTorneioPorModalidade(nomeModalidade);
    }
}