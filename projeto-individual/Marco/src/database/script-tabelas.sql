

create database P1;
use P1;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45),
senha varchar(30));

create table nota(
fkUsuario int primary key,
nota int,
foreign key (fkusuario) references usuario(idUsuario));




/*CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);/*


