DROP DATABASE PARDALIS;
CREATE DATABASE PARDALIS;
USE PARDALIS;

CREATE TABLE EMPRESA(
	ID_EMPRESA INT PRIMARY KEY AUTO_INCREMENT,
    EMPRESA_NOME VARCHAR(60) NOT NULL,
    EMPRESA_CNPJ CHAR(18) NOT NULL UNIQUE
);

CREATE TABLE USUARIO(
	ID_FUNCIONARIO INT PRIMARY KEY AUTO_INCREMENT,
    USUARIO_NOME VARCHAR(60) NOT NULL,
    USUARIO_EMAIL VARCHAR(60) NOT NULL CHECK(USUARIO_EMAIL = '%@%'),
    USUARIO_SENHA CHAR(128) NOT NULL,
    USUARIO_CARGO VARCHAR(60),
    USUARIO_ACESSO INT NOT NULL,
    USUARIO_FK_EMPRESA INT,
    FOREIGN KEY (USUARIO_FK_EMPRESA) REFERENCES EMPRESA(ID_EMPRESA)
);

CREATE TABLE DATA_CENTER(
	ID_DATA_CENTER INT PRIMARY KEY AUTO_INCREMENT,
    DATA_CENTER_LOGRADOURO VARCHAR(60) NOT NULL,
    DATA_CENTER_BAIRRO VARCHAR(60) NOT NULL,
    DATA_CENTER_CIDADE VARCHAR(60) NOT NULL,
    DATA_CENTER_ESTADO CHAR(2) NOT NULL,
    DATA_CENTER_PAIS VARCHAR(60) NOT NULL,
    DATA_CENTER_FK_EMPRESA INT,
    FOREIGN KEY (DATA_CENTER_FK_EMPRESA) REFERENCES EMPRESA(ID_EMPRESA)
);

CREATE TABLE MAQUINA(
	ID_MAQUINA INT PRIMARY KEY AUTO_INCREMENT,
    MAQUINA_SISTEMA_OPERACIONAL VARCHAR(50),
    MAQUINA_MODELO_PROCESSADOR VARCHAR(50),
    MAQUINA_THREADS INT,
    MAQUINA_QTD_CPU INT,
    MAQUINA_QTD_RAM INT,
    MAQUINA_QTD_CACHE INT,
    MAQUINA_ARMAZENAMENTO_MAXIMO INT,
    MAQUINA_FK_DATA_CENTER INT,
    FOREIGN KEY (MAQUINA_FK_DATA_CENTER) REFERENCES DATA_CENTER(ID_DATA_CENTER)
);

CREATE TABLE REGISTRO(
	ID_REGISTRO INT PRIMARY KEY AUTO_INCREMENT,
    REGISTRO_MOMENTO DATETIME NOT NULL,
    REGISTRO_TEMP_CPU DECIMAL(5, 2),
    REGISTRO_PORC_CPU DECIMAL(5, 2),
    REGISTRO_PORC_RAM DECIMAL(5, 2),
    REGISTRO_PORC_DISCO DECIMAL(5, 2),
    REGISTRO_NIVEL_CACHE_CPU DECIMAL(5, 2),
    REGISTRO_FK_MAQUINA INT,
    FOREIGN KEY (FK_MAQUINA) REFERENCES MAQUINA(ID_MAQUINA)
);

TRUNCATE TABLE REGISTRO;
SELECT * FROM REGISTRO;
SELECT * FROM MAQUINA;