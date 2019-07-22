"use strict";
/**
 * @file Classe para implementar informação.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Informacao
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(ajax)
 * @memberof window
 * @param {Event} event - objeto que representará o evento
 */
let info = new Informacao("divCentral");
window.onload = function (event) {
    info.getGeneros();
    info.getLocalidades();
    info.getTiposDeTorneio();
    info.getModalidades();
    window.info = info;
};

/** 
* @class Guarda toda informação necessaria na execução do projeto 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* @property {Jogador[]} jogadores - Array de objetos do tipo Jogador
* @property {Equipa[]} equipas - Array de objetos do tipo Equipa
* @property {Torneio[]} torneios - Array de objetos do tipo Torneio
* @property {Localidade[]} localidades - Array de objetos do tipo Localidade
* @property {Genero[]} generos - Array de objetos do tipo Genero
* @property {Modalidade[]} modalidades - Array de objetos do tipo Modalidade
* @property {TiposDeTorneio[]} tiposDeTorneio - Array de objetos do Tipos de Torneio
* @property {Jornada[]} jornadas - Array de objetos do tipo Jornada
* @property {Estatistica[]} estatisticas - Array de objetos do tipo Estatistica
*/
function Informacao(id) {
    this.id = id;
    this.jogadores = [];
    this.equipas = [];
    this.torneios = [];
    this.localidades = [];
    this.generos = [];
    this.modalidades = [];
    this.tiposDeTorneio = [];
    this.jornadas = [];
    this.estatisticas = [];
}


/**
 * Função para obter jogadores e mostrar na tabela
 */
Informacao.prototype.menuGetJogadores = function () {
    info.getJogadores("jogador");
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {string} acao - acao a ser executada
 * @param {Torneio} torneio - torneio a inscrever jogador mais tarde
 */
Informacao.prototype.getJogadores = function (acao, torneio) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/jogadores";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.jogadoresDB !== undefined) {
                info.jogadores = [];
                response.jogadoresDB.forEach(function (current) {
                    info.jogadores.push(new Jogador(current.id, current.nome,
                        (current.dataNascimento) ? current.dataNascimento.toString().split('T')[0] : "-",
                        current.localidadeId, current.generoId, current.modalidadeId));
                });
            }
            if (acao !== undefined) {
                if (acao === "jogador") {
                    //envia para requisitar torneio
                    info.getTorneios(acao);
                } else if (acao === "inscreverJogador") {
                    if (torneio !== undefined) {
                        if (info.jogadores.length > 0) {
                            formInscreverNoTorneio(torneio, info);
                        } else {
                            showSnackBar("Não existe jogadores para inscrição, deverá criar um novo ou mais.", 3000)
                        }
                    }
                }
            }
        }
    };
    xhr.send();
};

/**
 * Função para atualizar e/ou adicionar um jogador
 * @param {string} acao - acao a ser executada
 */
Informacao.prototype.processarJogador = function (acao) {
    let id = Number(document.getElementById("idJogador").value);
    let nome = document.getElementById("nomeJogador").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let localidadeList = document.getElementById("localidadeJogador");
    let localidade = localidadeList.options[localidadeList.selectedIndex].value;
    let generoList = document.getElementById("generoJogador");
    let genero = generoList.options[generoList.selectedIndex].value;
    let modalidadeList = document.getElementById("modalidadeJogador");
    let modalidade = modalidadeList.options[modalidadeList.selectedIndex].value;
    let jogador = { id: id, nome: nome, dataNascimento: dataNascimento, localidade: localidade, genero: genero, modalidade: modalidade };
    let xhr = new XMLHttpRequest();
    let url;
    xhr.responseType = "json";
    if (acao === "create") {
        url = "http://localhost:8081/jogador/novo";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let novoJogador = new Jogador(xhr.response.insertId, nome, dataNascimento, localidade, genero);
                info.jogadores.push(novoJogador);
                showSnackBar(novoJogador.nome + " foi criado com sucesso.", 2000);
                info.getJogadores("jogador");
            }
        }
        xhr.open("POST", url, true);
    } else if (acao === "update") {
        url = "http://localhost:8081/update/jogador/" + id;
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let index = info.getJogadorIndex(id);
                if (index !== -1) {
                    info.jogadores.splice(index, 1);
                    info.jogadores.push(jogador);
                    showSnackBar("Os dados do jogador " + jogador.id + " foi atualizado com sucesso.", 2000);
                } else {
                    showSnackBar("Não existe jogador " + id + ", por isso não é possivel atualizar os dados.", 2000);
                }
                info.getJogadores("jogador");
            }
        }
        xhr.open("PUT", url, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jogador));
};

/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id do jogador a ser removido
  */
Informacao.prototype.removerJogador = function (id) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/delete/jogador/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let index = info.getJogadorIndex(id);
            if (index !== -1) {
                info.jogadores.splice(index, 1);
                showSnackBar("Jogador " + id + " foi removido com sucesso.", 2000);
            } else {
                showSnackBar("Não existe jogador " + id + ", por isso não é possivel remover.", 2000);
            }
            info.getJogadores("jogador");
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index do jogador no array
 * @param {number} id - id do jogador
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getJogadorIndex = function (id) {
    let index = info.jogadores.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
  */
Informacao.prototype.getLocalidades = function () {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/localidades";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.localidadesDB !== undefined) {
                info.localidades = [];
                response.localidadesDB.forEach(function (current) {
                    info.localidades.push(new Localidade(current.id, current.nome));
                });
            }
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index do localidade no array
 * @param {number} id - id da localidade
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getLocalidadeIndex = function (id) {
    let index = info.localidades.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};


/**
 * Função para atualizar e/ou adicionar uma modalidade
 * @param {string} acao - acão a ser executada
 */
Informacao.prototype.processarModalidade = function (acao) {
    let id = Number(document.getElementById("idModalidade").value);
    let nome = document.getElementById("momeModalidade").value;
    let modalidade = { id: id, nome: nome };
    let xhr = new XMLHttpRequest();
    let url;
    xhr.responseType = "json";
    if (acao === "create") {
        url = "http://localhost:8081/modalidade/novo";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let novaModalidade = new Modalidade(xhr.response.insertId, nome);
                info.modalidades.push(novaModalidade);
                showSnackBar(novaModalidade.nome + " foi criado com sucesso.", 2000);
                info.getModalidades("modalidade");
            }
        }
        xhr.open("POST", url, true);
    } else if (acao === "update") {
        url = "http://localhost:8081/update/modalidade/" + id;
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let index = info.getModalidadeIndex(id);
                if (index !== -1) {
                    info.modalidades.splice(index, 1);
                    info.modalidades.push(modalidade);
                    showSnackBar("Os dados da modalidade " + modalidade.id + " foi atualizado com sucesso.", 2000);
                } else {
                    showSnackBar("Não existe modalidade " + id + ", por isso não é possivel atualizar os dados.", 2000);
                }
                info.getModalidades("modalidade");
            }
        }
        xhr.open("PUT", url, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(modalidade));

};

/**
 * Função que apaga o recurso modalidade com pedido ao NODE.JS através do verbo DELETE, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id da modalidade a ser removida
 */
Informacao.prototype.removerModalidade = function (id) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/delete/modalidade/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let index = info.getModalidadeIndex(id);
            if (index !== -1) {
                info.modalidades.splice(index, 1);
                showSnackBar("Modalidade " + id + " foi removido com sucesso.", 2000);
            } else {
                showSnackBar("Não existe modalidade " + id + ", por isso não é possivel remover.", 2000);
            }
            info.getModalidades("modalidade");
        }
    };
    xhr.send();
};

/**
 * Função para obter modalidades e mostrar na tabela
 */
Informacao.prototype.menuGetModalidades = function () {
    info.getModalidades("modalidade");
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {string} acao - acao a ser excutada 
  */
Informacao.prototype.getModalidades = function (acao) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/modalidades";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.modalidadesDB !== undefined) {
                info.modalidades = [];
                response.modalidadesDB.forEach(function (current) {
                    info.modalidades.push(new Modalidade(current.id, current.nome));
                });
            }
            if (acao !== undefined) {
                if (acao === "modalidade") {
                    //mostrar a tabela de modalides
                    mostrarTabelaModalidades(info);
                }
            }
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index do modalidade no array
 * @param {number} id - id da modalidade
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getModalidadeIndex = function (id) {
    let index = info.modalidades.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
  */
Informacao.prototype.getTiposDeTorneio = function () {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/tiposdetorneio";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.tiposdetorneioDB !== undefined) {
                info.tiposDeTorneio = [];
                response.tiposdetorneioDB.forEach(function (current) {
                    let tipodetorneio = factoryCriarTipoTorneio(current.id, current.nome);
                    if (tipodetorneio !== null || tipodetorneio !== void 0) {
                        info.tiposDeTorneio.push(tipodetorneio);
                    }
                });
            }
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index do tipos de torneio no array
 * @param {number} id - id do tipo de torneio
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getTipoTorneioIndex = function (id) {
    let index = info.tiposDeTorneio.findIndex(i => i.id === id);
    return (index !== null || index !== void 0) ? index : -1;
}

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
  */
Informacao.prototype.getGeneros = function () {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/generos";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.generosDB !== undefined) {
                info.generos = [];
                response.generosDB.forEach(function (current) {
                    let genero = factoryCriarTipoGenero(current.id, current.tipo);
                    if (genero != null || genero !== void 0) {
                        info.generos.push(genero);
                    }
                });
            }
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index do genero no array
 * @param {number} id - id de genero(M/F)
 * @returns {number} index se existir e -1 se não existir 
 */
Informacao.prototype.getGeneroIndex = function (id) {
    let index = info.generos.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};


/**
 * Função para obter equipas e mostrar na tabela
 */
Informacao.prototype.menuGetEquipas = function () {
    info.getEquipas("equipas");
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {string} acao - acao a ser excutada
 * @param {Torneio} torneio - torneio a inscrever equipa
  */
Informacao.prototype.getEquipas = function (acao, torneio) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/equipas";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.equipasDB !== undefined) {
                info.equipas = [];
                response.equipasDB.forEach(function (current) {
                    info.equipas.push(new Equipa(current.id, current.nome,
                        current.localidadeId, current.generoId, current.modalidadeId));
                });
            }
            if (acao !== undefined) {
                if (acao === "equipas") {
                    //envia para requisitar o torneio
                    info.getTorneios(acao);
                } else if (acao === "inscreverEquipa") {
                    if (torneio !== undefined) {
                        if (info.equipas.length > 0) {
                            formInscreverNoTorneio(torneio, info);
                        } else {
                            showSnackBar("Não existe equipas para inscrição, deverá criar um novo ou mais", 3000)
                        }
                    }
                }
            }
        }
    };
    xhr.send();
};

/**
 * Função para atualizar e/ou adicionar uma equipa
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.processarEquipa = function (acao) {
    let id = Number(document.getElementById("idEquipa").value);
    let nome = document.getElementById("nomeEquipa").value;
    let localidadeList = document.getElementById("localidadeEquipa");
    let localidadeId = localidadeList.options[localidadeList.selectedIndex].value;
    let generoList = document.getElementById("generoEquipa");
    let generoId = generoList.options[generoList.selectedIndex].value;
    let modalidadeList = document.getElementById("modalidadeEquipa");
    let modalidadeId = modalidadeList.options[modalidadeList.selectedIndex].value;
    let equipa = { id: id, nome: nome, localidade: localidadeId, genero: generoId, modalidade: modalidadeId };
    let xhr = new XMLHttpRequest();
    let url;
    xhr.responseType = "json";
    if (acao === "create") {
        url = "http://localhost:8081/equipa/novo";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let novaEquipa = new Equipa(xhr.response.insertId, nome, localidadeId, generoId, modalidadeId);
                info.equipas.push(novaEquipa);
                showSnackBar(novaEquipa.nome + " foi criado com sucesso.", 2000);
                info.getEquipas("equipas");
            }
        }
        xhr.open("POST", url, true);
    } else if (acao === "update") {
        url = "http://localhost:8081/update/equipa/" + id;
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let index = info.getEquipaIndex(id);
                if (index !== -1) {
                    info.equipas.splice(index, 1);
                    info.equipas.push(equipa);
                    showSnackBar("Os dados da equipa " + equipa.id + " foi atualizado com sucesso.", 2000);
                } else {
                    showSnackBar("Não existe equipa " + id + ", por isso não é possivel atualizar os dados.", 2000);
                }
                info.getEquipas("equipas");
            }
        }
        xhr.open("PUT", url, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(equipa));
};

/**
 * Função que apaga o recurso equipa com ym pedido ao NODE.JS através do verbo DELETE, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id da equipa a ser removida
 */
Informacao.prototype.removerEquipa = function (id) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/delete/equipa/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let index = info.getEquipaIndex(id);
            if (index !== -1) {
                info.equipas.splice(index, 1);
                showSnackBar("Equipa " + id + " foi removido com sucesso.", 2000);
            } else {
                showSnackBar("Não existe equipa " + id + ", por isso não é possivel remover.", 2000);
            }
            info.getEquipas("equipas");
        }
    };
    xhr.send();
};

/**
 * Função para retorna o index da equipa no array
 * @param {number} id - id da equipa
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getEquipaIndex = function (id) {
    let index = info.equipas.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};

/**
 * Função para mostrar os detalhes do torneio
 * @param {Torneio} torneio - torneio
 */
Informacao.prototype.detalhesTorneio = function (torneio) {
    if (torneio.tipo === 1) {//jogadores
        info.getJogadoresNoTorneio(Number(torneio.id), "detalhesTorneio", "torneio");
    } else if (torneio.tipo === 2) {//equipas
        info.getEquipasNoTorneio(Number(torneio.id), "detalhesTorneio", "torneio");
    }
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {string} tipo - tipo de torneio individual ou por equipa
  */
Informacao.prototype.getTorneiosPorTipo = function (tipo) {
    let tipoId = (tipo === "individual") ? 1 : (tipo === "equipa") ? 2 : 0;
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/torneio/tipo/" + Number(tipoId);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.torneiosDB !== undefined) {
                info.torneios = [];
                response.torneiosDB.forEach(function (current) {
                    let torneio = factoryCriarTorneio(current.id, current.nome, current.localidadeId,
                        current.modalidadeId, current.tipodetorneioId,
                        (current.data) ? current.data.toString().split('T')[0] : "-",
                        current.generoId, current.vencedor);
                    if (torneio != null || torneio !== void 0) {
                        info.torneios.push(torneio);
                    }
                });
            }
            //mostrar a lista de torneios
            mostrarTabelaTorneios(tipoId, info);
        }

    };
    xhr.send();
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
  */
Informacao.prototype.mostrarTorneioPorTipo = function () {
    let tiposdetorneioList = document.getElementById("tiposdetorneio");
    let tiposdetorneioId = tiposdetorneioList.options[tiposdetorneioList.selectedIndex].value;
    let tipo = info.getTorneioAcao(Number(tiposdetorneioId));
    if (tipo !== "N/A") {
        info.getTorneiosPorTipo(tipo);
    }
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {Modalidade} modalidade - modalidade do torneio
 */
Informacao.prototype.getTorneioPorModalidade = function (modalidade) {
    let modalidadeId = info.getModalidadeId(modalidade);
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/torneio/modalidade/" + modalidadeId;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.torneiosDB !== undefined) {
                info.torneios = [];
                response.torneiosDB.forEach(function (current) {
                    let torneio = factoryCriarTorneio(current.id, current.nome, current.localidadeId,
                        current.modalidadeId, current.tipodetorneioId,
                        (current.data) ? current.data.toString().split('T')[0] : "-",
                        current.generoId, current.vencedor);
                    if (torneio != null || torneio !== void 0) {
                        info.torneios.push(torneio);
                    }
                });
            }
            if (info.torneios.length > 0) {
                info.torneios.forEach(function (torneio) {
                    if (torneio.modalidade === modalidadeId) {
                        //mostrar os torneios pela modalidade
                        mostrarTorneioPorModalidade(torneio.modalidade, info, "modalidade");
                    }
                });
            } else {
                showSnackBar("Não existe torneio para modalidade " + modalidade + ", cria um novo", 3000);
            }
        }

    };
    xhr.send();
};



/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.getTorneios = function (acao) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/torneios";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.torneiosDB !== undefined) {
                info.torneios = [];
                response.torneiosDB.forEach(function (current) {
                    let torneio = factoryCriarTorneio(current.id, current.nome, current.localidadeId,
                        current.modalidadeId, current.tipodetorneioId,
                        (current.data) ? current.data.toString().split('T')[0] : "-",
                        current.generoId, current.vencedor);
                    if (torneio != null || torneio !== void 0) {
                        info.torneios.push(torneio);
                    }
                });
            }
            if (acao !== undefined) {
                if (acao === "estatistica") {
                    visualizarEstatisticaTorneio(info);
                } else if (acao === "disponivel") {
                    info.mostrarTorneioComEquipa(acao);
                } else if (acao === "equipas") {
                    //mostrar a tabela de equipas
                    mostrarTabelaEquipas(info);
                } else if (acao === "jogador") {
                    //mostrar a tabela de jogadores
                    mostrarTabelaJogadores(info);
                }
            }
        }
    };
    xhr.send();
};

/**
 * Função para mostrar a lista de torneios
 */
Informacao.prototype.showTorneiosDisponiveis = function () {
    //mostrar torneios já com as equipas inscritas
    info.getTorneios("disponivel");
};

/**
 * função para mostrar equipas inscritas no torneio
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.mostrarTorneioComEquipa = function (acao, tipo) {
    //obter todas as equipas no torneio
    if (info.torneios.length > 0) {
        info.torneios.forEach(function (current) {
            info.getEquipasNoTorneio(current.id, acao, tipo);
        });
    } else {
        showSnackBar("Não existe torneio disponivel, cria um novo", 2000);
    }
};

/**
 * Função para atualizar e/ou adicionar um torneio
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.processarTorneio = function (acao) {
    let id = Number(document.getElementById("idTorneio").value);
    let nome = document.getElementById("nomeTorneio").value;
    let data = document.getElementById("dataTorneio").value;
    let localidadeList = document.getElementById("localidadeTorneio");
    let localidadeId = localidadeList.options[localidadeList.selectedIndex].value;
    let generoList = document.getElementById("generoTorneio");
    let generoId = generoList.options[generoList.selectedIndex].value;
    let tiposdetorneioList = document.getElementById("tiposdetorneio");
    let tiposdetorneioId = tiposdetorneioList.options[tiposdetorneioList.selectedIndex].value;
    let modalidadeList = document.getElementById("modalidadeTorneio");
    let modalidadeId = modalidadeList.options[modalidadeList.selectedIndex].value;
    let vencedor = document.getElementById("vencedor").value;
    let torneio = { id: id, nome: nome, localidade: localidadeId, modalidade: modalidadeId, tipo: tiposdetorneioId, data: data, genero: generoId, vencedor: vencedor };
    let url;
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    let msg = info.getTorneioAcao(Number(tiposdetorneioId));
    if (acao === "create") {
        url = "http://localhost:8081/torneio/novo";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let novoTorneio = new Torneio(xhr.response.insertId, nome, localidadeId, modalidadeId, tiposdetorneioId, data, generoId, vencedor);
                info.torneios.push(novoTorneio);
                showSnackBar(novoTorneio.nome + " foi criado com sucesso.", 2000);
                if (msg !== "N/A") {
                    info.getTorneiosPorTipo(msg);
                }
            }
        }
        xhr.open("POST", url, true);
    } else if (acao === "update") {
        url = "http://localhost:8081/update/torneio/" + id;
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let index = info.getTorneioIndex(id);
                if (index !== -1) {
                    info.torneios.splice(index, 1);
                    info.torneios.push(torneio);
                    showSnackBar("Os dados do torneio " + torneio.id + " foi atualizada com sucesso.", 2000);
                } else {
                    showSnackBar("Não existe torneio " + id + ", por isso não é possivel atualizar os dados.", 2000);
                }
                if (msg !== "N/A") {
                    info.getTorneiosPorTipo(msg);
                }
            }
        }
        xhr.open("PUT", url, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(torneio));
};


/**
 * Função para atualizar o vencedor de um torneio
 * @param {Torneio} torneio - torneio a atualizar
 */
Informacao.prototype.updateVencedorTorneio = function (torneio) {
    let torneioVencedor = { vencedor: torneio.vencedor };
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    let url = "http://localhost:8081/update/vencedor/torneio/" + torneio.id;
    xhr.onreadystatechange = function () {
        if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
            let index = info.getTorneioIndex(torneio.id);
            if (index !== -1) {
                info.torneios.splice(index, 1);
                info.torneios.push(torneio);
                showSnackBar("Os dados do torneio " + torneio.id + " foi atualizada com sucesso.", 2000);
            } else {
                showSnackBar("Não existe torneio " + id + ", por isso não é possivel atualizar os dados.", 2000);
            }
        }
    }
    xhr.open("PUT", url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(torneioVencedor));
};


/**
 * Função que  equipa com ym pedido ao NODE.JS através do verbo DELETE, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id do torneio a ser removido 
 */
Informacao.prototype.removerTorneio = function (id) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/delete/torneio/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let index = info.getTorneioIndex(id);
            if (index !== -1) {
                let acao = info.getTorneioAcao(Number(info.torneios[index].tipo));
                info.torneios.splice(index, 1);
                showSnackBar("Torneio " + id + " foi removido com sucesso.", 2000);
                if (acao !== "N/A") {
                    info.getTorneiosPorTipo(acao);
                }
            } else {
                showSnackBar("Não existe torneio " + id + ", por isso não é possivel remover.", 2000);
            }
        }
    };
    xhr.send();
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id do torneio
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.getEquipasNoTorneio = function (id, acao, tipo) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/equipas/torneio/" + id;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let torneioIndex = info.getTorneioIndex(id);
            if (torneioIndex !== -1) {
                let response = JSON.parse(xhr.responseText);
                if (response.torneioequipaDB !== undefined) {
                    info.torneios[torneioIndex].equipas = [];
                    response.torneioequipaDB.forEach(function (current) {
                        let equipa = new Equipa(current.equipaId, current.nome,
                            current.localidadeId, current.generoId, current.modalidadeId);
                        info.torneios[torneioIndex].equipas.push(equipa);
                    });
                }
                if (acao === "disponivel") {
                    mostrarTorneioDisponiveis(info);
                } else if (acao === "visualizar") {
                    if (info.torneios[torneioIndex].equipas.length > 0) {
                        visualizarTorneio(info.torneios[torneioIndex], info, "resetar", tipo);
                    } else {
                        showSnackBar("Não existe equipas inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                } else if (acao === "formInscreverNoTorneio") {
                    formInscreverNoTorneio(info.torneios[torneioIndex], info);
                } else if (acao === "estatisticaTorneio") {
                    if (info.torneios[torneioIndex].equipas.length > 0) {
                        info.mostrarEstatisticaPorTorneio(info.torneios[torneioIndex], tipo);
                    } else {
                        showSnackBar("Não existe equipas inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                } else if (acao === "detalhesTorneio") {
                    if (info.torneios[torneioIndex].equipas.length > 0) {
                        info.mostrarDetalhesEstatistica(info.torneios[torneioIndex]);
                    } else {
                        showSnackBar("Não existe equipas inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                }
            }
        }
    };
    xhr.send();
};

/**
 * Funçãp para inscrever equipa no torneio
 * @param {Torneio} torneio - torneio a inscrever equipa
 * @param {Equipa} equipa - equipa a inscrever no torneio
 */
Informacao.prototype.inscreverEquipaNoTorneio = function (torneio, equipa) {
    let torneioequipa = { torneioId: torneio.id, equipaId: equipa.id };
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/equipa/torneio/adicionar";
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
            showSnackBar(obterAcronimo(equipa.nome) + " foi adicionada no " + torneio.nome, 2000);
            info.getEquipasNoTorneio(torneio.id, "formInscreverNoTorneio");
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(torneioequipa));
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id do torneio 
 * @param {string} acao - acao a ser excutada
 */
Informacao.prototype.getJogadoresNoTorneio = function (id, acao, tipo) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/jogadores/torneio/" + id;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let torneioIndex = info.getTorneioIndex(id);
            if (torneioIndex !== -1) {
                let response = JSON.parse(xhr.responseText);
                if (response.torneioindividualDB !== undefined) {
                    info.torneios[torneioIndex].jogadores = [];
                    response.torneioindividualDB.forEach(function (current) {
                        let jogador = new Jogador(current.id, current.nome,
                            (current.dataNascimento) ? current.dataNascimento.toString().split('T')[0] : "-",
                            current.localidadeId, current.generoId, current.modalidadeId);
                        info.torneios[torneioIndex].jogadores.push(jogador);
                    });
                }

                if (acao === "disponivel") {
                    mostrarTorneioDisponiveis(info);
                } else if (acao === "visualizar") {
                    if (info.torneios[torneioIndex].jogadores.length > 0) {
                        visualizarTorneio(info.torneios[torneioIndex], info, "resetar", tipo);
                    } else {
                        showSnackBar("Não existe jogadores inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                } else if (acao === "formInscreverNoTorneio") {
                    formInscreverNoTorneio(info.torneios[torneioIndex], info);
                } else if (acao === "estatisticaTorneio") {
                    if (info.torneios[torneioIndex].jogadores.length > 0) {
                        info.mostrarEstatisticaPorTorneio(info.torneios[torneioIndex], tipo);
                    } else {
                        showSnackBar("Não existe jogadores inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                } else if (acao === "detalhesTorneio") {
                    if (info.torneios[torneioIndex].jogadores.length > 0) {
                        info.mostrarDetalhesEstatistica(info.torneios[torneioIndex]);
                    } else {
                        showSnackBar("Não existe jogadores inscritos no " + info.torneios[torneioIndex].nome, 3000);
                    }
                }
            }
        }
    };
    xhr.send();
};


Informacao.prototype.mostrarDetalhesEstatistica = function (torneio) {
    if (torneio.tipo === 1) {//jogadores
        if (torneio.jogadores !== undefined) {
            torneio.jogadores.forEach(function (current) {
                info.getEstatisticaPorJogador(current.id, "detalhesTorneio", torneio);
            });
        } else {
            showSnackBar("Não há dados a mostrar da estatistica do " + torneio.nome, 2000);
        }

    } else if (torneio.tipo === 2) {//equipas
        if (torneio.equipas !== undefined) {
            torneio.equipas.forEach(function (current) {
                info.getEstatisticaPorEquipa(current.id, "detalhesTorneio", torneio);
            });
        } else {
            showSnackBar("Não há dados a mostrar da estatistica do " + torneio.nome, 2000);
        }
    }
};

/**
 * Funçãp para inscrever jogador no torneio
 * @param {Torneio} torneio - torneio a inscrever jogador
 * @param {Jogador} jogador - jogador a inscrever no torneio
 */
Informacao.prototype.inscreverJogadorNoTorneio = function (torneio, jogador) {
    let torneioindividual = { torneioId: torneio.id, jogadorId: jogador.id };
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/jogador/torneio/adicionar";
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
            showSnackBar(jogador.nome + " foi adicionado no " + torneio.nome, 2000);
            info.getJogadoresNoTorneio(torneio.id, "formInscreverNoTorneio");
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(torneioindividual));
};

/**
 * Função para visualizar a estatistica dos torneios
 */
Informacao.prototype.visualizarEstatistica = function () {
    info.getTorneios();
    info.getEquipas();
    info.getJogadores();
    info.getEstatisticas("estatisticaGeral");
};

/**
 * Função para mostrar estatisticas de um torneio
 * @param {Torneio} torneio - torneio a visualizar estatistica
 */
Informacao.prototype.mostrarEstatisticaPorTorneio = function (torneio, tipo) {
    if (torneio.tipo === 1) {//jogadores
        if (torneio.jogadores !== undefined) {
            torneio.jogadores.forEach(function (current) {
                info.getEstatisticaPorJogador(current.id, "estatisticaTorneio", torneio, tipo);
            });
        } else {
            showSnackBar("Não há dados a mostrar da estatistica do " + torneio.nome, 2000);
        }

    } else if (torneio.tipo === 2) {//equipas
        if (torneio.equipas !== undefined) {
            torneio.equipas.forEach(function (current) {
                info.getEstatisticaPorEquipa(current.id, "estatisticaTorneio", torneio, tipo);
            });
        } else {
            showSnackBar("Não há dados a mostrar da estatistica do " + torneio.nome, 2000);
        }
    }
};

/**
 * Função para requisitar estatisticas de BD  
 * @param {string} acao - acao a ser executada
 */
Informacao.prototype.getEstatisticas = function (acao) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/estatisticas";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let response = JSON.parse(xhr.responseText);
            if (response.estatisticasDB !== undefined) {
                info.estatisticas = [];
                response.estatisticasDB.forEach(function (current) {
                    info.estatisticas.push(current);
                });
            }
            if (info.estatisticas.length > 0) {
                let aux = estatisticaGeral(info);
                if (acao === "estatisticaGeral") {
                    mostrarEstatisticaGeral(aux);
                }
            } else {
                showSnackBar("Não há dados a mostrar de estatistica dos torneios", 2000);
            }
        }
    };
    xhr.send();
};



/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {number} id - id da equipa
 * @param {string} acao - acao a ser excutada
 * @param {Torneio} torneio - torneio a obter equipa inscrita
 */
Informacao.prototype.getEstatisticaPorEquipa = function (id, acao, torneio, tipo) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/estatisticas/equipa/" + id;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let equipaIndex = null;
            if (torneio !== undefined) {
                equipaIndex = torneio.equipas.findIndex(i => i.id === id);
            } else {
                equipaIndex = info.getEquipaIndex(id);
            }
            if (equipaIndex !== -1) {
                let response = JSON.parse(xhr.responseText);
                if (torneio !== undefined) {
                    torneio.equipas[equipaIndex].estatisticas = [];
                } else {
                    info.equipas[equipaIndex].estatisticas = [];
                }
                if (response.estatisticaEquipaDB !== undefined) {
                    response.estatisticaEquipaDB.forEach(function (current) {
                        let torneioIndex = info.getTorneioIndex(current.torneioId);
                        if (torneioIndex !== -1) {
                            let estatistica = new Estatistica(
                                current.pontos,
                                current.marcados,
                                current.sofridos,
                                current.vitorias,
                                current.empates,
                                current.derrotas,
                                info.torneios[torneioIndex]);
                            estatistica.setId(current.id);
                            if (torneio !== undefined) {
                                estatistica.setEquipa(torneio.equipas[equipaIndex]);
                                torneio.equipas[equipaIndex].pontos = current.pontos;
                                torneio.equipas[equipaIndex].marcados = current.marcados;
                                torneio.equipas[equipaIndex].sofridos = current.sofridos;
                                torneio.equipas[equipaIndex].vitorias = current.vitorias;
                                torneio.equipas[equipaIndex].empates = current.empates;
                                torneio.equipas[equipaIndex].derrotas = current.derrotas;
                                torneio.equipas[equipaIndex].adicionarEstatistica(estatistica);
                            } else {
                                estatistica.setEquipa(info.equipas[equipaIndex]);
                                info.equipas[equipaIndex].adicionarEstatistica(estatistica);
                            }
                        }
                    });
                    if (torneio !== undefined) {
                        if (torneio.equipas[equipaIndex].estatisticas.length > 0) {
                            if (acao === "estatisticaTorneio") {
                                //ordenar por pontos
                                ordenacaoPorPontos(torneio);
                                mostrarEstatisticaTorneio(torneio, info, tipo);
                            } else if (acao === "detalhesTorneio") {
                                detalhesTorneio(torneio, info, "torneio")
                            }
                        } else {
                            showSnackBar("Não é possivel mostrar estatisticas de " + torneio.nome, 2000);
                        }
                    } else {
                        if (acao === "detalhesEquipa") {
                            visualizarDetalhesEquipa(info.equipas[equipaIndex], info);
                        }
                    }
                }
            }
        }
    };
    xhr.send();
};

/** 
* Função que que tem como principal objetivo 
* solicitar ao servidor NODE.JS o
* recurso país através do verbo GET, 
* usando pedidos assincronos e JSON
* @param {number} id - id do jogador
* @param {string} acao - acao a ser excutada
* @param {Torneio} torneio - torneio a obter jogador inscrito
*/
Informacao.prototype.getEstatisticaPorJogador = function (id, acao, torneio, tipo) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8081/estatisticas/jogador/" + id;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let jogadorIndex = null;
            if (torneio !== undefined) {
                jogadorIndex = torneio.jogadores.findIndex(i => i.id === id);
            } else {
                jogadorIndex = info.getJogadorIndex(id);
            }
            if (jogadorIndex !== -1) {
                let response = JSON.parse(xhr.responseText);
                if (torneio !== undefined) {
                    torneio.jogadores[jogadorIndex].estatisticas = [];
                } else {
                    info.jogadores[jogadorIndex].estatisticas = [];
                }
                if (response.estatisticaJogadorDB !== undefined) {
                    response.estatisticaJogadorDB.forEach(function (current) {
                        let torneioIndex = info.getTorneioIndex(current.torneioId);
                        if (torneioIndex !== -1) {
                            let estatistica = new Estatistica(
                                current.pontos,
                                current.marcados,
                                current.sofridos,
                                current.vitorias,
                                current.empates,
                                current.derrotas,
                                info.torneios[torneioIndex]);
                            estatistica.setId(current.id);
                            if (torneio !== undefined) {
                                estatistica.setJogador(torneio.jogadores[jogadorIndex]);
                                torneio.jogadores[jogadorIndex].pontos = current.pontos;
                                torneio.jogadores[jogadorIndex].marcados = current.marcados;
                                torneio.jogadores[jogadorIndex].sofridos = current.sofridos;
                                torneio.jogadores[jogadorIndex].vitorias = current.vitorias;
                                torneio.jogadores[jogadorIndex].empates = current.empates;
                                torneio.jogadores[jogadorIndex].derrotas = current.derrotas;
                                torneio.jogadores[jogadorIndex].adicionarEstatistica(estatistica);
                            } else {
                                estatistica.setJogador(info.jogadores[jogadorIndex]);
                                info.jogadores[jogadorIndex].adicionarEstatistica(estatistica);
                            }
                        }
                    });
                    if (torneio !== undefined) {
                        if (torneio.jogadores[jogadorIndex].estatisticas.length > 0) {
                            if (acao === "estatisticaTorneio") {
                                //ordenar por pontos
                                ordenacaoPorPontos(torneio);
                                mostrarEstatisticaTorneio(torneio, info, tipo);
                            } else if (acao === "detalhesTorneio") {
                                detalhesTorneio(torneio, info, "torneio")
                            }
                        } else {
                            showSnackBar("Não é possivel mostrar estatisticas de " + torneio.nome, 2000);
                        }
                    } else {
                        if (acao === "detalhesJogador") {
                            visualizarDetalhesJogador(info.jogadores[jogadorIndex], info);
                        }
                    }
                }
            }
        }
    };
    xhr.send();
};

/**
 * Função que que tem como principal objetivo 
 * solicitar ao servidor NODE.JS o
 * recurso país através do verbo GET, 
 * usando pedidos assincronos e JSON
 * @param {Estatistica} estatistica -  estatistica a guardado na BD
 */
Informacao.prototype.createEstatistica = function (estatistica) {
    let estatisticaBD = null;
    if (estatistica.torneio.tipo === 1) {
        estatisticaBD = {
            torneioId: estatistica.torneio.id,
            torneioTipo: estatistica.torneio.tipo,
            pontos: estatistica.pontos,
            marcados: estatistica.jogador.marcados,
            sofridos: estatistica.jogador.sofridos,
            vitorias: estatistica.jogador.vitorias,
            derrotas: estatistica.jogador.derrotas,
            empates: estatistica.jogador.empates,
            jogadorId: estatistica.jogador.id
        };
    } else if (estatistica.torneio.tipo === 2) {
        estatisticaBD = {
            torneioId: estatistica.torneio.id,
            torneioTipo: estatistica.torneio.tipo,
            pontos: estatistica.equipa.pontos,
            marcados: estatistica.equipa.marcados,
            sofridos: estatistica.equipa.sofridos,
            vitorias: estatistica.equipa.vitorias,
            derrotas: estatistica.equipa.derrotas,
            empates: estatistica.equipa.empates,
            equipaId: estatistica.equipa.id
        };
    }
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    let url = "http://localhost:8081/estatistica/novo";
    xhr.onreadystatechange = function () {
        if ((xhr.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(estatisticaBD));
};


/**
 * Função para retorna o index do torneio no array
 * @param {number} id - id do torneio
 * @returns {number} index se existir e -1 se não existir
 */
Informacao.prototype.getTorneioIndex = function (id) {
    let index = info.torneios.findIndex(i => i.id === id);
    return (index !== undefined || index !== void 0) ? index : -1;
};

/**
 * Função retornar o nome da localidade
 * @param {number} id - id da localidade
 * @returns {string} nome da localidade se existir e N/A se não existir
 */
Informacao.prototype.getNomeLocalidade = function (id) {
    let index = info.getLocalidadeIndex(id);
    return (index !== -1) ? info.localidades[index].nome : "N/A";
};

/**
 * Função retornar o nome da modalidade
 * @param {number} id - id da modalidade
 * @returns {string} nome da modalidade se existir e N/A se não existir
 */
Informacao.prototype.getNomeModalidade = function (id) {
    let index = info.getModalidadeIndex(id);
    return (index !== -1) ? info.modalidades[index].nome : "N/A";
};

/**
 * Função retornar o nome do torneio
 * @param {number} id - id do torneio
 * @returns {string} nome do torneio se existir e N/A se não existir
 */
Informacao.prototype.getNomeTorneio = function (id) {
    let index = info.getTiposDeTorneio(id);
    return (index !== -1) ? info.torneios[index].nome : "N/A";
};

/**
 * Função retornar o nome do torneio
 * @param {number} id - id do genero(M/F)
 * @returns {string} tipo de genero(M/F) se existir e N/A se não existir
 */
Informacao.prototype.getTipoGenero = function (id) {
    let index = info.getGeneroIndex(id);
    return (index !== -1) ? info.generos[index].tipo : "N/A";
};

/**
 * Função retornar o nome do tipo de torneio
 * @param {number} id - id do tipo de torneio
 * @returns {string} nome do tipo de torneio se existir e N/A se não existir
 */
Informacao.prototype.getNomeTipoTorneio = function (id) {
    let index = info.getTipoTorneioIndex(id);
    return (index !== -1) ? info.tiposDeTorneio[index].nome : "N/A";
};

/**
 * Função retornar o id da modalidade
 * @param {string} nome - nome da modalidade
 * @returns {number} id da modalidade se existir e -1 se não existir
 */
Informacao.prototype.getModalidadeId = function (nome) {
    let index = info.modalidades.findIndex(i => i.nome === nome);
    return (index !== null || index !== void 0) ? info.modalidades[index].id : -1;
};

/**
 * Função auxiliar para mostrar um tipo de torneio - titulo individual ou por equipa
 * @param {string} tipo - tipo de acao a excutar
 * @returns {number} individual ou por equipa existir e N/A se não existir
*/
Informacao.prototype.getTorneioAcao = function (tipo) {
    return (tipo === 1) ? "individual" : (tipo === 2) ? "equipa" : "N/A";
};

/**
 * Função para esconder formularios inciais
 */
function hidenForm() {
    document.getElementById("divFormularioJogador").style.display = "none";
    document.getElementById("divFormularioEquipa").style.display = "none";
    document.getElementById("divFormularioTorneio").style.display = "none";
    document.getElementById("divFormularioModalidade").style.display = "none";

}

