"use strict";
/**
 * @file Classes para implementar tipos de torneio.
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Classe Tipos De Torneio
 */
 
/**
 * @class representa um tipo de torneio 
 * @constructs TiposDeTorneio
 * @param {number} id - id do tipo de torneio
 * @param {nome} nome - nome do tipo de torneio
 * 
 * @property {number} id - id do tipo de torneio
 * @property {nome} nome - nome do tipo de torneio
 */
function TiposDeTorneio(id, nome) {
    this.id = id;
    this.nome = nome;
}

/**
 * Classe Torneio Titulo Individual 
 */
 
/**
 * @class tipo de torneio por titulo individual
 * @constructs TorneioTituloIndividual
 * @extends TiposDeTorneio
 * @param {number} id - id do tipo de torneio
 * @param {nome} nome - nome do tipo de torneio
 */
function TorneioTituloIndividual(id, nome) {
    TiposDeTorneio.call(this, id, nome);
}
TorneioTituloIndividual.prototype = Object.create(TiposDeTorneio.prototype);
TorneioTituloIndividual.prototype.constructor = TorneioTituloIndividual;

/**
 * Classe Torneio Por Equipa
 */
 
 /**
 * @class tipo de torneio por equipas
 * @constructs TorneioPorEquipa
 * @extends TiposDeTorneio
 * @param {number} id - id do tipo de torneio
 * @param {nome} nome - nome do tipo de torneio
 */
function TorneioPorEquipa(id, nome) {
    TiposDeTorneio.call(this, id, nome);
}
TorneioPorEquipa.prototype = Object.create(TiposDeTorneio.prototype);
TorneioPorEquipa.prototype.constructor = TorneioPorEquipa;

/**
 * Factory para criar um tipo de torneio e retornar objeto do seu tipo
 * @param {number} id - id do tipo de torneio
 * @param {nome} nome - nome do tipo de torneio
 * @returns {TiposDeTorneio} tipos de torneio individual ou por equipas
 */
function factoryCriarTipoTorneio(id, nome) {
    switch (Number(id)) {
        case 1://titulo individual
            return new TorneioTituloIndividual(id, nome);
        case 2://por equipa
            return new TorneioPorEquipa(id, nome);
    }
    return null;
}