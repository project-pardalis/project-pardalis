CREATE TABLE Empresa(	
    idEmpresa INT PRIMARY KEY IDENTITY(1, 1),	
    nomeEmpresa VARCHAR(60) NOT NULL,	
    cnpjEmpresa CHAR(14) NOT NULL UNIQUE	
);	

CREATE TABLE Usuario(	
	idUsuario INT PRIMARY KEY IDENTITY(1, 1),	
    nomeUsuario VARCHAR(60) NOT NULL,	
    emailUsuario VARCHAR(60) NOT NULL UNIQUE CHECK(emailUsuario LIKE '%@%'),	
    senhaUsuario CHAR(128) NOT NULL,	
    cargo VARCHAR(60),	
    fkEmpresa INT NOT NULL,	
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),	
    fkAdministrador INT,	
    FOREIGN KEY (fkAdministrador) REFERENCES Usuario(idUsuario)	
);	

CREATE TABLE Maquina(	
	idMaquina INT IDENTITY(1, 1),	
    nomeMaquina VARCHAR(50) NOT NULL,	
    sistemaOperacional VARCHAR(50) NOT NULL,	
    onCloud bit NOT NULL,	
    dataCriacao DATETIME,	
    hashMaquina CHAR(12) NOT NULL UNIQUE,	
    fkEmpresa INT NOT NULL,	
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),	
    PRIMARY KEY(idMaquina, fkEmpresa)	
);	
CREATE TABLE Maquina(	
	idMaquina INT IDENTITY(1, 1),	
    nomeMaquina VARCHAR(50) NOT NULL,	
    sistemaOperacional VARCHAR(50) NOT NULL,	
    onCloud bit NOT NULL,	
    dataCriacao DATETIME,	
    hashMaquina CHAR(12) NOT NULL UNIQUE,	
    fkEmpresa INT NOT NULL,	
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),	
    PRIMARY KEY(idMaquina)
  );	
CREATE TABLE Componente(	
	idComponente INT IDENTITY(1, 1),	
    nomeComponente VARCHAR(50) NOT NULL,	
    isComponenteValido bit NOT NULL,	
    descricao varchar(128),	
    idMaquina INT NOT NULL ,	
    FOREIGN KEY (idMaquina) REFERENCES Maquina(idMaquina),	
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),	
    PRIMARY KEY(idComponente)	
);

CREATE TABLE Metrica(	
    idMetrica INT PRIMARY KEY IDENTITY(1, 1),
    nomeMetrica VARCHAR(45) NOT NULL,	
    unidadeDeMedida VARCHAR(10) NOT NULL,	
    isEstatico bit NOT NULL	
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
    idLeitura INT IDENTITY(1, 1),
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

INSERT INTO [PARDALIS].[dbo].[Empresa]
		( [nomeEmpresa], [cnpjEmpresa])
VALUES
       ('Sptech','00000000000000');

INSERT INTO [PARDALIS].[dbo].[Usuario]
		( [nomeUsuario], [emailUsuario], [senhaUsuario], [cargo], [fkEmpresa], [fkAdministrador])
VALUES
       ('João', 'joao@gmail.com', hashbytes('SHA2_256', 'Teste@123'), 'Analista', 1, null);

CREATE VIEW [dbo].[vw_empresa_sptech_maquina_componentes] 
	AS SELECT nomeComponente, isComponenteValido, descricao, nomeEmpresa, nomeMaquina 	
FROM [dbo].[Empresa] 	
JOIN Maquina ON (idEmpresa = Maquina.fkEmpresa) 	
JOIN Componente ON (Componente.idMaquina = Maquina.idMaquina and Componente.fkEmpresa = idEmpresa);	

CREATE VIEW [dbo].[vw_empresa_sptech_maquina1_leitura]
AS SELECT nomeMaquina, dataCriacao, nomeComponente, nomeMetrica, 	
	   unidadeDeMedida, dataColeta, valorLeitura FROM [dbo].[Leitura] 	
       JOIN Componente on idComponente = Leitura.fkComponente	
	   JOIN Metrica on idMetrica = Leitura.fkMetrica	
       JOIN Maquina on Maquina.idMaquina = Leitura.fkMaquina and nomeMaquina = 'Servidor-SPTECH';

CREATE VIEW [dbo].[vw_empresa_sptech_maquinas] AS	
SELECT nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina 	
FROM [dbo].[Empresa] JOIN Maquina ON idEmpresa = fkEmpresa;	
