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
    fkMaquina INT NOT NULL ,	
    FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),	
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

-- Metricas

INSERT INTO [dbo].[Metrica] (nomeMetrica, unidadeDeMedida, isEstatico) VALUES('cpu_Utilizacao', '%', 0),	
						  ('cpu_Frequencia_Maxima', 'HZ', 1),	
                          ('cpu_Frequencia_Atual', 'HZ', 0),	
                          ('cpu_Temperature', '°C', 0),	
                          ('cpu_Frequencia_Minima', 'HZ', 1); -- CPU	
                          
INSERT INTO [dbo].[Metrica] (nomeMetrica, unidadeDeMedida, isEstatico) VALUES('ram_Total', 'GB', 1),	
						  ('ram_Usada', 'GB', 0); -- RAM	

INSERT INTO [dbo].[Metrica] (nomeMetrica, unidadeDeMedida, isEstatico) VALUES('disco_Total', 'GB', 1),	
						  ('disco_read_time', 'MB', 0),	
						  ('disco_write_time', 'MB', 0),	
						  ('disco_Usado', 'GB', 0); -- DISCO