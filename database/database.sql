
-- criar base de dados se existir
DROP DATABASE IF EXISTS `torneiodb`;
CREATE DATABASE IF NOT EXISTS `torneiodb`;
USE `torneiodb`;

-- eliminiar as tabelas se existir
DROP TABLE IF EXISTS `genero`;
DROP TABLE IF EXISTS `jogador`;
DROP TABLE IF EXISTS `localidade`;
DROP TABLE IF EXISTS `modalidade`;
DROP TABLE IF EXISTS `tipodetorneio`;
DROP TABLE IF EXISTS `torneio`;
DROP TABLE IF EXISTS `equipa`;
DROP TABLE IF EXISTS `estatistica`;
DROP TABLE IF EXISTS `torneioequipa`;
DROP TABLE IF EXISTS `torneioindividual`;

-- criação de tabelas
CREATE TABLE `localidade` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `genero` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `modalidade` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `jogador` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `localidadeId` INT(11) NOT NULL,
    `generoId` INT(11) NOT NULL,
    `modalidadeId` INT(11) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `tipodetorneio` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `equipa` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `localidadeId` INT(11) NOT NULL,
    `generoId` INT(11) NOT NULL,
    `modalidadeId` INT(11) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `estatistica` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `pontos` INT NOT NULL,
    `marcados` INT NOT NULL,
    `sofridos` INT NOT NULL,
    `vitorias` INT NOT NULL,
    `derrotas` INT NOT NULL,
	 `empates`  INT NOT NULL,
	 `torneioId` INT(11) NOT NULL,
    `jogadorId` INT(11) NULL,
    `equipaId` INT(11) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `torneio` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `localidadeId` INT(11) NOT NULL,
    `modalidadeId` INT(11) NOT NULL,
    `tipodetorneioId` INT(11) NOT NULL,
    `data` DATE NOT NULL,
    `generoId` INT(11) NOT NULL,
    `jogadorId` INT(11) NULL,
    `equipaId` INT(11) NULL,
    `vencedor` VARCHAR(255) DEFAULT "N/A",
    PRIMARY KEY (`id`)
);

CREATE TABLE `torneioequipa` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `torneioId` INT(11) NOT NULL,
    `equipaId` INT(11) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `torneioindividual` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `torneioId` INT(11) NOT NULL,
    `jogadorId` INT(11) NULL,
    PRIMARY KEY (`id`)
);

-- criação de chaves estrangeiras
ALTER TABLE `jogador` ADD CONSTRAINT `jogador_localidade_fk` 
   FOREIGN KEY (`localidadeId`) REFERENCES `localidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `jogador` ADD CONSTRAINT `jogador_genero_fk` 
   FOREIGN KEY (`generoId`) REFERENCES `genero` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `jogador` ADD CONSTRAINT `jogador_modalidade_fk` 
   FOREIGN KEY (`modalidadeId`) REFERENCES `modalidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `equipa` ADD CONSTRAINT `localidade_equipa_fk` 
   FOREIGN KEY (`localidadeId`) REFERENCES `localidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `equipa` ADD CONSTRAINT `equipa_genero_fk` 
   FOREIGN KEY (`generoId`) REFERENCES `genero` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `equipa` ADD CONSTRAINT `modalidade_equipa_fk` 
   FOREIGN KEY (`modalidadeId`) REFERENCES `modalidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;
   
   ALTER TABLE `estatistica` ADD CONSTRAINT `jogador_estatistica_fk` 
   FOREIGN KEY (`jogadorId`) REFERENCES `jogador` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `estatistica` ADD CONSTRAINT `equipa_estatistica_fk` 
   FOREIGN KEY (`equipaId`) REFERENCES `equipa` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;
   
ALTER TABLE `estatistica` ADD CONSTRAINT `estatistica_torneio_fk` 
   FOREIGN KEY (`torneioId`) REFERENCES `torneio` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;
   
ALTER TABLE `torneio` ADD CONSTRAINT `torneio_localidade_fk` 
   FOREIGN KEY (`localidadeId`) REFERENCES `localidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneio` ADD CONSTRAINT `modalidade_torneio_fk` 
   FOREIGN KEY (`modalidadeId`) REFERENCES `modalidade` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneio` ADD CONSTRAINT `tipodetorneio_torneio_fk` 
   FOREIGN KEY (`tipodetorneioId`) REFERENCES `tipodetorneio` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneio` ADD CONSTRAINT `torneio_genero_fk` 
   FOREIGN KEY (`generoId`) REFERENCES `genero` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneio` ADD CONSTRAINT `jogador_torneio_fk` 
   FOREIGN KEY (`jogadorId`) REFERENCES `jogador` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneio` ADD CONSTRAINT `equipa_torneio_fk` 
   FOREIGN KEY (`equipaId`) REFERENCES `equipa` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneioequipa` ADD CONSTRAINT `equipa_no_torneio_fk` 
   FOREIGN KEY (`equipaId`) REFERENCES `equipa` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneioequipa` ADD CONSTRAINT `equipa_no_torneio_id_fk` 
   FOREIGN KEY (`torneioId`) REFERENCES `torneio` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneioindividual` ADD CONSTRAINT `jogador_no_torneio_fk` 
   FOREIGN KEY (`jogadorId`) REFERENCES `jogador` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `torneioindividual` ADD CONSTRAINT `jogador_no_torneio_id_fk` 
   FOREIGN KEY (`torneioId`) REFERENCES `torneio` (`id`)
   ON DELETE CASCADE ON UPDATE CASCADE;

-- dados inseridos por omissão(default)
INSERT INTO `localidade` (`nome`) VALUES
('Pouço da Moura'), -- 1
('Praias do Sado'),-- 2
('Manteigada'),-- 3
('Quinta da Amizade'),-- 4
('São Sebastião'),-- 5
('Morgada'),-- 6
('Pinhal Novo'),-- 7
('Setúbal'),-- 8
('Alto da Guerra'),-- 9
('Seixal'),-- 10
('Lisboa'),-- 11
('Palmela'), -- 12
('Porto');  -- 13

INSERT INTO `genero` (`tipo`) VALUES
("M"),-- 1
("F"), -- 2
("M/F");-- 3

INSERT INTO `modalidade` (`nome`) VALUES
("basketball"),-- 1
("futsal"),-- 2
("voleibol");-- 3

INSERT INTO `jogador` (`id`,`nome`,`dataNascimento`,`localidadeId`,`generoId`,`modalidadeId`) VALUES
(1, 'Neveah Jennings', '1956-10-05', 1,2,1),
(2, 'Mckenna Nielsen', '1976-10-15', 2,2,2),
(3, 'Jase Rojas', '1930-10-07', 3,2,3),
(4, 'Emmett Horton', '1905-02-01', 4,1,1),
(5, 'Devan Gilmore', '2000-04-11', 5,1,2),
(6, 'Jeremy Mejia', '1905-01-07', 6,1,3),
(7, 'Haven Rogers', '1940-05-26', 7,1,2),
(8, 'Kaiya Juarez', '1980-12-21', 8,2,1),
(9, 'Sammy Bowers', '1997-09-23', 9,1,3),
(10, 'Albert Allison', '1916-06-03', 10,1,3),
(11, 'Vance Schaefer', '1973-03-11', 11,1,1),
(12, 'Jenny Huber', '1991-01-03', 12,2,2),
(13, 'Nayeli Cardenas', '1946-11-20', 13,2,2),
(14, 'Carla Blevins', '1987-09-26', 1,2,1),
(15, 'Valerie Mclean', '1987-01-17', 2,2,1),
(16, 'Raven Barrett', '1994-03-01', 3,2,1),
(17, 'Rory Holder', '1938-04-08', 4,1,3),
(18, 'Cade Guzman', '1951-07-17', 5,1,3),
(19, 'Lesly Graham', '1953-07-11', 6,1,3),
(20, 'Draven Wilson', '1989-12-21', 7,1,2),
(21, 'Katrina Carlson', '1974-04-28', 8,2,1),
(22, 'Amari Gardner', '1988-06-11', 9,2,3),
(23, 'Jakobe Gibson', '1926-08-17', 10,1,1),
(24, 'Kody Arroyo', '1987-04-03', 11,1,2),
(25, 'Alanna Trujillo', '1905-02-10', 12,2,3),
(26, 'Darion Fischer', '1919-09-13', 13,1,1),
(27, 'Conrad Williams', '1911-09-01', 1,1,3),
(28, 'Stephany Keller', '1965-01-07', 2,2,2),
(29, 'Kayley Harvey', '1962-06-09', 3,2,2),
(30, 'Riley Ellison', '1938-10-17', 4,1,2),
(31, 'Evangeline Valdez', '1926-11-02', 5,2,1),
(32, 'Van Foley', '1929-03-03', 6,1,1),
(33, 'Kiana Moon', '1956-06-21', 7,2,1),
(34, 'Alyson Porter', '1945-04-02', 8,1,1),
(35, 'Noel Rowland', '1906-04-12', 9,1,1),
(36, 'Kyleigh Merritt', '1924-05-15', 10,2,2),
(37, 'Jewel Clark', '1996-07-26', 11,1,2),
(38, 'Jalen Vega', '1910-10-24', 12,2,3),
(39, 'Susan Gallagher', '1916-09-21', 13,2,2),
(40, 'John Daniel', '1903-02-16', 1,1,3),
(41, 'Sanaa Valenzuela', '1985-11-28', 2,2,3),
(42, 'Chad Cross', '1975-08-14', 3,1,2),
(43, 'Amiah Patterson', '1966-07-17', 4,2,1),
(44, 'Marcelo Silva', '1929-06-04', 5,1,1),
(45, 'Natalya Villanueva', '1979-04-13', 6,1,2),
(46, 'Mohammed Esparza', '1955-06-15', 7,1,3),
(47, 'Saul Moss', '1950-07-06', 8,1,3),
(48, 'Sawyer Clay', '1987-10-10', 9,1,3),
(49, 'Kylie Riddle', '1994-06-22', 10,2,1),
(50, 'Jacob Clements', '1960-01-01', 11,1,2);

INSERT INTO `tipodetorneio` (`nome`) VALUES
("Titulo Individual"),-- 1
("Por Equipas");-- 2

INSERT INTO `equipa` (`nome`,`localidadeId`,`generoId`,`modalidadeId`) VALUES
-- 10 equipas de modalidade - baskteball [M/F]
("CAB Madeira",1,1,1),-- M
("Oliveirense FC",2,1,1),-- M
("Ovarense CD",3,1,1),-- M
("Imortal LB",4,1,1),-- M
("Super Galitos",5,1,1),-- M
("Gil Vicente",6,2,1),-- F
("Vitoria Setubal FC",8,2,1),-- F
("CD Terceira",7,2,1),-- F
("Academica de Viseu",9,2,1),-- F
("Rio Ave",10,2,1),-- F
-- 10 equipas de modalidade - futsal [M/F]
("Sporting Clube Portugal",11,1,2),-- M
("Sporting Lisboa Benfica",12,1,2),-- M
("Belenenses FC",13,1,2),-- M
("Fundão FC",1,1,2),-- M
("Desportivos das Aves",2,1,2),-- M
("Sporting Clube de Braga",3,2,2),-- F
("Desportivos das Chaves",4,2,2),-- F
("Boavista Futebol Clube",5,2,2),-- F
("Modicus Sandim",6,2,2),-- F
("Futsal Azemeis",7,2,2),-- F
-- 10 equipas de modalidade - voleibol [M/F]
("Academica de Espinho",8,1,3),-- M
("Castelo Maia GC",9,1,3),-- M
("Leixoes SC",10,1,3),-- M
("SC Caldas",11,1,3),-- M
("Vitoria SC",12,1,3),-- M
("Porto Volei",13,2,3),-- F
("CK Ponta Delgada",1,2,3),-- F
("AVC Famalicao",2,2,3),-- F
("Eanes Lobato",3,2,3),-- F
("AA Jose Moreira",4,2,3);-- F

INSERT INTO `torneio` (`nome`,`localidadeId`,`modalidadeId`,`tipodetorneioId`,`data`,`generoId`) VALUES
("Torneio de Verão 2019",11,1,2,'2019-06-30', 1);

INSERT INTO `torneio` (`nome`,`localidadeId`,`modalidadeId`,`tipodetorneioId`,`data`,`generoId`) VALUES
("Torneio de Futsal",1,2,1,'2019-06-30', 3);

INSERT INTO `torneio` (`nome`,`localidadeId`,`modalidadeId`,`tipodetorneioId`,`data`,`generoId`) VALUES
("Torneio de Volei",4,3,1,'2019-06-30',2);

INSERT INTO `torneio` (`nome`,`localidadeId`,`modalidadeId`,`tipodetorneioId`,`data`,`generoId`) VALUES
("Torneio de Basketball",8,1,2,'2019-06-30',3);

INSERT INTO `torneio` (`nome`,`localidadeId`,`modalidadeId`,`tipodetorneioId`,`data`,`generoId`) VALUES
("Futsal de Areia",8,2,2,'2019-06-30',1);



