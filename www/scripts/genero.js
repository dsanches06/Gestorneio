"use strict";
/**
 * @file Classes para implementar genero(M/F).
 * @author  Danilson Sanches
 * @copyright 2019
 * @version 1.0.0
 */

/**
 * Classe Genero
 */
 
/**
 * @class representa um genero M/F
 * @constructs Genero
 * @param {number} id - id do genero
 * @param {string} tipo - tipo de genero M/F
 * 
 * @property {number} id - id do genero
 * @property {string} tipo - tipo de genero M/F
 */
function Genero(id, tipo) {
    this.id = id;
    this.tipo = tipo;
}

/**
 * Classe Genero Masculino
 */
 
/**
 * @class representa o genero Masculino
 * @constructs Masculino
 * @extends Genero
 * @param {number} id - id do genero
 * @param {string} tipo - tipo de genero M
 * 
 * @property {number} id - id do genero
 * @property {string} tipo - tipo de genero M
 */
function Masculino(id, tipo) {
    Genero.call(this, id, tipo);
}
Masculino.prototype = Object.create(Genero.prototype);
Masculino.prototype.constructor = Masculino;

/**
 * Classe Genero Feminino
 */
 
/**
 * @class representa o genero Feminino
 * @constructs Feminino
 * @extends Genero
 * @param {number} id - id do genero
 * @param {string} tipo - tipo de genero F
 * 
 * @property {number} id - id do genero
 * @property {string} tipo - tipo de genero F
 */
function Feminino(id, tipo) {
    Genero.call(this, id, tipo);
}
Feminino.prototype = Object.create(Genero.prototype);
Feminino.prototype.constructor = Feminino;


/**
 * Classe Misto
 */
 
/**
 * @class representa o genero misto(M/F)
 * @constructs Misto
 * @extends Genero
 * @param {number} id - id do genero
 * @param {string} tipo - tipo de genero M/F
 * 
 * @property {number} id - id do genero
 * @property {string} tipo - tipo de genero M/F
 */
function Misto(id, tipo) {
    Genero.call(this, id, tipo);
}
Misto.prototype = Object.create(Genero.prototype);
Misto.prototype.constructor = Misto;

/**
 * Factory para criar um genero e retornar o objecto do seu tipo 
 * @param {number} id - id do genero
 * @param {string} tipo - tipo de genero M/F
 * @returns {Genero} genero do tipo Masculino, Feminino, Misto ou null
 */
function factoryCriarTipoGenero(id, tipo) {
    switch (Number(id)) {
        case 1://genero masculino(M)
            return new Masculino(id, tipo);
        case 2://genero feminino(F)
            return new Feminino(id, tipo);
        case 3://genero misto(M/F)
            return new Misto(id, tipo);
    }
    return null;
}
