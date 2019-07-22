"use strict";
/**
 * @file Função para implementar dom.
 * @author Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com os supostos headers
 * @param {Object} lista - lista do qual vamos transformar os atributos e TH
 * @returns {HTMLElement} thead da tabela geral
 */
function tableHead(lista) {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    for (let i = 0; i < lista.length; i++) {
        let th = document.createElement("th");
        th.className = "th-sm text-center";
        th.appendChild(document.createTextNode(lista[i]));
        tr.appendChild(th);
    }
    return thead;
}

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com os supostos headers
 * @param {Object} nome - objecto do qual vamos transformar os atributos e TH
 * @returns {HTMLElement} thead da tabela jornada
 */
function tableHeadJornada(nome) {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    let th = document.createElement("th");
    th.className = "th-sm text-center";
    th.colSpan = "5";
    th.appendChild(document.createTextNode(nome));
    tr.appendChild(th);
    return thead;
}


/**
 * Função para limpar os elementos dentro de uma div
 * @param {HTMLElement} parent - elemento html a remover e adicionar novos nodes
 */
function limparDiv(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    hidenForm();
}

/**
 * Função para limpar dados preenchidos no formulario 
 * @param {HTMLElement} id - id do formulario html
 */
function limparFormulario(id) {
    let form = document.getElementById(id);
    form.reset();
}

/**
 * Code from W3Schools
 * @param message
 * @param timeoutMillis
 */
function showSnackBar(message, timeoutMillis) {
    let snackDiv = document.getElementById("snackbar");
    snackDiv.textContent = message;
    snackDiv.className = "show";
    setTimeout(function () {
        snackDiv.className = snackDiv.className.replace("show", "");
    }, timeoutMillis);
}

/**
 * Função para carregar as propriedades da datatable
 * @param {HTMLElement} id - id do elemento html a carregar datatable
 */
function loadDatatable(id) {
    $(document).ready(function () {
        $('#' + id).DataTable({
            responsive: true,
            "language": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            },
            "scrollY": "70vh",
            "scrollCollapse": true,
            destroy: true
        });
        $('.dataTables_length').addClass('bs-select');
    });
    $('#' + id).DataTable().columns.adjust();
}

