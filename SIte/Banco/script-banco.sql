CREATE DATABASE Pardalis;

USE Pardalis;

CREATE TABLE USUARIO(
    USUARIO_ID INT PRIMARY KEY AUTO_INCREMENT,
    USUARIO_NOME VARCHAR(110) NOT NULL,
    USUARIO_EMAIL VARCHAR(110) NOT NULL,
    USUARIO_SENHA CHAR(32) NOT NULL,
    USUARIO_ACESSO INT,
    USUARIO_FKEMPRESA INT,
    FOREIGN KEY (USUARIO_FKEMPRESA) REFERENCES EMPRESA(EMPRESA_ID)
) AUTO_INCREMENT = 022200;

CREATE TABLE EMPRESA(
    EMPRESA_ID INT PRIMARY KEY AUTO_INCREMENT,
    EMPRESA_NOME VARCHAR(60),
    EMPRESA_CNPJ CHAR(18)
);

SELECT * FROM EMPRESA;