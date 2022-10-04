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
INSERT INTO Empresa Values (null, "Sptech", "00000000000000");
INSERT INTO Usuario values (null, "João", "joao@gmail.com", "Teste@123", "Analista", 1, null);
INSERT INTO Maquina VALUES (null, "Servidor-SPTECH", "", true, null, "1234567890", 1);

INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("cpu_Utilizacao", "%", 0),
						  ("cpu_Frequencia_Maxima", "HZ", 1),
                          ("cpu_Frequencia_Atual", "HZ", 0),
                          ("cpu_Temperature", "°C", 0),
                          ("cpu_Frequencia_Minima", "HZ", 1); -- CPU

INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("ram_Total", "GB", 1),
						  ("ram_Usada", "GB", 0); -- RAM
                          
INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("disco_Total", "GB", 1),
						  ("disco_read_time", "MB", 0),
						  ("disco_write_time", "MB", 0),
						  ("disco_Usado", "GB", 0); -- DISCO

-- Não rodar!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

INSERT INTO Metrica (nomeMetrica, unidadeDeMedida, isEstatico) VALUES("Dados Recebidos", "MB", 0),
						  ("Dados Enviados", "MB", 0);


-- Views

CREATE VIEW `vw_empresa_sptech_maquina_componentes` AS
SELECT nomeComponente, isComponenteValido, descricao, nomeEmpresa, nomeMaquina 
FROM Empresa 
JOIN Maquina ON idEmpresa = Maquina.fkEmpresa 
JOIN Componente ON Componente.fkMaquina = idMaquina and Componente.fkEmpresa = idEmpresa;

CREATE VIEW `vw_empresa_sptech_maquina1_leitura` AS
SELECT nomeMaquina, dataCriacao, nomeComponente, nomeMetrica, 
	   unidadeDeMedida, dataColeta, valorLeitura FROM Leitura 
       JOIN Componente on idComponente = Leitura.fkComponente
	   JOIN Metrica on idMetrica = Leitura.fkMetrica
       JOIN Maquina on idMaquina = Leitura.fkMaquina and nomeMaquina = 'Servidor-SPTECH';

CREATE VIEW `vw_empresa_sptech_maquinas` AS
SELECT nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina 
FROM Empresa JOIN Maquina ON idEmpresa = fkEmpresa;