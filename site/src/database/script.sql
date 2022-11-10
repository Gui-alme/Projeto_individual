create database projetoRiven;

use projetoRiven;

create table Perfil(
	idPerfil int primary key auto_increment,
    nome varchar(45),
    username varchar(45),
    senha varchar(45)
);

create table Avaliacoes(
	idAvaliacoes int primary key auto_increment,
    descricao varchar(45),
    fkPerfil int,
    foreign key (fkPerfil) references Perfil(idPerfil)
);

create table QuizTentativa(
	idTentativa int primary key auto_increment,
    respostasCertas int,
    respostasErradas int,
    fkPerfil int,
    foreign key (fkPerfil) references Perfil(idPerfil)
);


