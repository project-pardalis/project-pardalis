CREATE DATABASE pardalis;

USE pardalis;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cnpj CHAR(18) NOT NULL UNIQUE
);

CREATE TABLE funcionario(
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL CHECK(email = '%@%'),
    senha CHAR(128) NOT NULL,
    cargo VARCHAR(60),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE servidor(
	idServidor INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(60) NOT NULL,
    bairro VARCHAR(60) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    estado CHAR(2) NOT NULL,
    pais VARCHAR(60) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    sistemaOperacional VARCHAR(50),
    modeloProcessador VARCHAR(50),
    threads INT,
    qtdCPU INT,
    qtdRAM INT,
    qtdCache INT,
    armazenamentoMaximo INT,
    fkServidor INT,
    FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
);

CREATE TABLE registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    momento DATETIME NOT NULL,
    temperaturaCPU DECIMAL(5, 2),
    porcentagemCPU DECIMAL(5, 2),
    porcentagemRAM DECIMAL(5, 2),
    porcentagemDisco DECIMAL(5, 2),
    nivelCacheCPU DECIMAL(5, 2),
    fkMaquina INT,
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina)
);

TRUNCATE TABLE registro;
SELECT * FROM registro;