--
-- sudo createdb -U postgres plaza-care
--
create table cuidador (
    idcuidador serial,
    email varchar(255) not null,
    nomecuidador varchar(255) not null,
    membrodesde date default now(),
    linkfacebook varchar(255) not null,
    chaveacesso varchar(255) not null,
    primary key (idcuidador)
);

create table plaza (
    idplaza serial,
    lat decimal(9,6) not null,
    lng decimal(9,6) not null,
    nomepraca varchar(255) not null,
    descricaopraca text,
    datacriacao date default now(),
    primary key (idplaza)
);

create table evento (
    idevento serial,
    idplaza integer not null,
    dtinicioevento timestamp default now(), 
    dtfimevento timestamp default now() + interval '1 hour',
    tituloevento varchar(255) not null,
    dscevento text not null,
    foreign key (idplaza) references plaza(idplaza),
    primary key (idevento)
);

--
-- tabelas de relacionamento
--

create table cuidador_plaza(
    idcuidador integer not null,
    idplaza integer not null,
    cuidadesde date default now(),
    foreign key (idplaza) references plaza(idplaza),
    foreign key (idcuidador) references cuidador(idcuidador)
);

create table cuidador_evento(
    idcuidador integer not null,
    idevento integer not null,
    admin boolean default false,
    foreign key (idevento) references evento(idevento),
    foreign key (idcuidador) references cuidador(idcuidador)
);
