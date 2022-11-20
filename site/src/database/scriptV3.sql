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
    voto char(3),
    descricao varchar(45),
    fkPerfil int,
    foreign key (fkPerfil) references Perfil(idPerfil)
);

create table Quiz(
	idQuiz int primary key auto_increment,
    nome varchar(45)
);

create table Tentativa(
	idTentativa int primary key auto_increment,
    respostas_certas int,
    respostas_erradas int, 
    fkPerfil int,
    foreign key (fkPerfil) references Perfil(idPerfil),
    fkQuiz int,
    foreign key (fkQuiz) references Quiz(idQuiz)
);

create table QuizPergunta(
	idPergunta int primary key auto_increment,
    descricao varchar(45),
    resposta1 varchar(45),
    resposta2 varchar(45),
    resposta3 varchar(45),
    resposta4 varchar(45),
    fkQuiz int, 
    foreign key (fkQuiz) references Quiz(idQuiz)
);

insert into Quiz values
(null, 'Riven curiosidades');


insert into QuizPergunta values
(null, 'Qual equipamento de batalha a Riven utiliza?', 'Espada quebrada', 'Lança', 'Kunai', 'Katana', 1),
(null, 'Onde a Riven foi exilada?', 'Zaun', 'Piltover', 'Noxus', 'Ionia', 1),
(null, 'Qual o nome da ultimate da Riven?', 'Asas quebradas', 'Explosão de KI', 'Valentia', 'Lâmina do exílio', 1),
(null, 'Quem quebrou a espada da Riven?', 'Yasuo', 'Ancião de Ionia', 'Draven', 'Ladrão zaunita', 1),
(null, 'Qual o maior inimigo da Riven?', 'Yasuo', 'Darius', 'Draven', 'Xin Zhao', 1);

select p.idPergunta, p.descricao, p.resposta1, p.resposta2, p.resposta3, p.resposta4, p.fkQuiz  from QuizPergunta p;
 










