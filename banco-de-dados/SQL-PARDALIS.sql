CREATE DATABASE PARDALIS;
USE PARDALIS;

CREATE TABLE Empresa(
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(60) NOT NULL,
    cnpjEmpresa CHAR(14) NOT NULL
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(60) NOT NULL,
    emailUsuario VARCHAR(60) NOT NULL UNIQUE,
    senhaUsuario CHAR(128) NOT NULL,
    cargo VARCHAR(60) NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(fkEmpresa),
    fkAdministrador INT,
    FOREIGN KEY (fkAdministrador) REFERENCES Administrador(fkAdministrador)
);

CREATE TABLE Maquina(
	idMaquina INT AUTO_INCREMENT,
    nomeMaquina VARCHAR(50) NOT NULL,
    sistemaOperacional VARCHAR(50) NOT NULL,
    onCloud BOOLEAN NOT NULL,
    dataCriacao DATETIME NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(fkEmpresa),
    PRIMARY KEY(idMaquina, fkEmpresa)
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nomeComponente VARCHAR(50) NOT NULL,
    isComponenteValido BOOLEAN NOT NULL,
    fkMaquina INT NOT NULL,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(fkMaquina),
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(fkEmpresa),
    PRIMARY KEY(idComponente, fkMaquina, fkEmpresa)
);

CREATE TABLE Metrica(
    idMetrica INT PRIMARY KEY AUTO_INCREMENT,
    nomeMetrica VARCHAR(45) NOT NULL,
    unidadeDeMedida VARCHAR(10) NOT NULL,
);

CREATE TABLE Componente_has_Metrica(
    fkComponente INT NOT NULL,
    fkMetrica INT NOT NULL,
    fkMaquina INT NOT NULL,
    fkEmpresa INT NOT NULL,
    isEstatico BOOLEAN NOT NULL,
    FOREIGN KEY (fkComponente) REFERENCES Componente(fkComponente),
    FOREIGN KEY (fkMetrica) REFERENCES Metrica(fkMetrica),
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(fkMaquina),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(fkEmpresa),
    PRIMARY KEY(fkComponente, fkMetrica, fkMaquina, fkEmpresa)
);
CREATE TABLE Leitura(
    idLeitura INT AUTO_INCREMENT,
    fkComponente INT NOT NULL,
    fkMetrica INT NOT NULL,
    fkMaquina INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkComponente) REFERENCES Componente(fkComponente),
    FOREIGN KEY (fkMetrica) REFERENCES Metrica(fkMetrica),
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(fkMaquina),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(fkEmpresa),
    PRIMARY KEY(idLeitura, fkComponente, fkMetrica, fkMaquina, fkEmpresa),
    dataColeta DATETIME NOT NULL,
    valorLeitura DECIMAL(7,2) NOT NULL
);