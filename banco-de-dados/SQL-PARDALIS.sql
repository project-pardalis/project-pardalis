drop database PARDALIS;
CREATE DATABASE IF NOT EXISTS PARDALIS;
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
    cargo VARCHAR(60),
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    fkAdministrador INT,
    FOREIGN KEY (fkAdministrador) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Maquina(
	idMaquina INT AUTO_INCREMENT,
    nomeMaquina VARCHAR(50) NOT NULL,
    sistemaOperacional VARCHAR(50) NOT NULL,
    onCloud BOOLEAN NOT NULL,
    dataCriacao DATETIME,
    hashMaquina CHAR(10) NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY(idMaquina, fkEmpresa)
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nomeComponente VARCHAR(50) NOT NULL,
    isComponenteValido BOOLEAN NOT NULL,
    descricao JSON,
    fkMaquina INT NOT NULL,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY(idComponente, fkMaquina, fkEmpresa)
);

CREATE TABLE Metrica(
    idMetrica INT PRIMARY KEY AUTO_INCREMENT,
    nomeMetrica VARCHAR(45) NOT NULL,
    unidadeDeMedida VARCHAR(10) NOT NULL,
    isEstatico BOOLEAN NOT NULL
);

CREATE TABLE Componente_has_Metrica(
    fkComponente INT NOT NULL,
    fkMetrica INT NOT NULL,
    fkMaquina INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    FOREIGN KEY (fkMetrica) REFERENCES Metrica(idMetrica),
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY(fkComponente, fkMetrica, fkMaquina, fkEmpresa)
);
CREATE TABLE Leitura(
    idLeitura INT AUTO_INCREMENT,
    fkComponente INT NOT NULL,
    fkMetrica INT NOT NULL,
    fkMaquina INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    FOREIGN KEY (fkMetrica) REFERENCES Metrica(idMetrica),
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY(idLeitura, fkComponente, fkMetrica, fkMaquina, fkEmpresa),
    dataColeta DATETIME NOT NULL,
    valorLeitura DECIMAL(7,2) NOT NULL
);
select * from  Maquina;
INSERT INTO Empresa Values (null, "Teste1", "00000000000000");
INSERT INTO Usuario values (null, "João", "joao@gmail.com", "Teste@!23", "", 1, null);
INSERT INTO Maquina VALUES (null, "Servidor-SPTECH", "", true, null, "1234567890", 1);
select * from Metrica;
SELECT fkMetrica FROM Componente_has_Metrica JOIN Metrica ON fkComponente = 1 AND Metrica.isEstatico = 1;
# Colocar o mesmo nome das métricas e no Python (Arquivo: comandosParaArmazenarDados) e também no arquivo comandosDados na parte get_cpu_info
# (Arquivo: comandosParaArmazenarDados) e (Arquivo: comandosDados e Função: get_cpu_info, get_memory_info e get_disk_info) já estão com as métricas iguais só falta o banco
INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("Utilização", "%", 0),
						  ("cpu_Frequencia_Maxima", "HZ", 1),
                          ("Frequência Atual", "HZ", 0),
                          ("cpu_Frequencia_Minima", "HZ", 1);

INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("ram_Total", "GB", 1),
						  ("ram_Usada", "GB", 0); # RAM
                          
INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("disco_Total", "GB", 1),
						  ("disco_Usado", "GB", 0); # DISCO

INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("Dados Recebidos", "MB", 0),
						  ("Dados Enviados", "MB", 0),
                          ("IP?", "HZ", 0); # Internet

INSERT INTO Componente_has_Metrica VALUES (1, 1, 1, 1);
INSERT INTO Componente_has_Metrica VALUES (1, 2, 1, 1);
select * from Leitura;
