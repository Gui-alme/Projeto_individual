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

create table QuizPergunta(
	idPergunta int primary key auto_increment,
    descricao varchar(45),
    resposta1 varchar(45),
    resposta2 varchar(45),
    resposta3 varchar(45),
    resposta4 varchar(45)
);

create table Tentativa(
	idTentativa int,
    fkPergunta int,
    foreign key (fkPergunta) references QuizPergunta(idPergunta),
    fkPerfil int,
    foreign key (fkPerfil) references Perfil(idPerfil),
    primary key (idTentativa, fkPergunta, fkPerfil)
);

insert into QuizPergunta values
(null, 'Qual equipamento de batalha a Riven utiliza?', 'Espada quebrada', 'Lança', 'Kunai', 'Katana'),
(null, 'Onde a Riven foi exilada?', 'Zaun', 'Piltover', 'Noxus', 'Ionia'),
(null, 'Qual o nome da ultimate da Riven?', 'Asas quebradas', 'Explosão de KI', 'Valentia', 'Lâmina do exílio'),
(null, 'Quem quebrou a espada da Riven?', 'Yasuo', 'Ancião de Ionia', 'Draven', 'Ladrão zaunita'),
(null, 'Qual o maior inimigo da Riven?', 'Yasuo', 'Darius', 'Draven', 'Xin Zhao');

select p.idPergunta, p.descricao, p.resposta1, p.resposta2, p.resposta3, p.resposta4  from QuizPergunta p;

select * from Perfil;

select * from QuizPergunta;





