/*
 * criação do esquema de banco via migrations
 */
exports.up = function(knex, Promise) {
  /*create table cuidador (
      idcuidador serial,
      email varchar(255) unique,
      nomecuidador varchar(255) not null,
      membrodesde date default now(),
      idfacebook varchar(255) not null,
      chaveacessofb varchar(255) not null,
      primary key (idcuidador)
  );*/
  return knex.schema.createTable('cuidador', function (table) {
    table.increments('idcuidador');
    table.string('email').unique();
    table.string('nomecuidador').notNullable();
    table.date('membrodesde').defaultTo(knex.raw('now()'));
    table.string('idfacebook').notNullable();
    table.string('chaveacessofb').notNullable();
  })
  /*create table plaza (
      idplaza serial,
      lat decimal(9,6) not null,
      lng decimal(9,6) not null,
      nomepraca varchar(255) not null,
      descricaopraca text,
      datacriacao date default now(),
      primary key (idplaza)
  );*/
  .createTable('plaza', function (table){
    table.increments('idplaza');
    table.decimal('lat',9,6).notNullable();
    table.decimal('lng',9,6).notNullable();
    table.string('nomeplaza').notNullable();
    table.text('descricaoplaza');
    table.date('datacriacao').defaultTo(knex.raw('now()'));
  })
  /*create table evento (
      idevento serial,
      idplaza integer not null,
      dtinicioevento timestamp default now(),
      dtfimevento timestamp default now() + interval '1 hour',
      tituloevento varchar(255) not null,
      dscevento text not null,
      foreign key (idplaza) references plaza(idplaza),
      primary key (idevento)
  );*/
  .createTable('evento', function (table){
    table.increments('idevento');
    table.integer('idplaza').notNullable().references('idplaza').inTable('plaza');
    table.timestamp('dtinicioevento',true).defaultTo(knex.raw('now()'));
    table.timestamp('dtfimevento',true).defaultTo(knex.raw("now() + interval '1 hour'"));
    table.string('tituloevento').notNullable();
    table.text('dscevento');
  })
  /*create table cuidador_plaza(
      idcuidador integer not null,
      idplaza integer not null,
      cuidadesde date default now(),
      foreign key (idplaza) references plaza(idplaza),
      foreign key (idcuidador) references cuidador(idcuidador)
  );*/
  .createTable('cuidador_plaza',function(table){
    table.integer('idcuidador').notNullable().references('idcuidador').inTable('cuidador');
    table.integer('idplaza').notNullable().references('idplaza').inTable('plaza');
    table.date('cuidadesde').defaultTo(knex.raw('now()'));
  })
  /*create table cuidador_evento(
      idcuidador integer not null,
      idevento integer not null,
      admin boolean default false,
      foreign key (idevento) references evento(idevento),
      foreign key (idcuidador) references cuidador(idcuidador)
  );*/
  .createTable('cuidador_evento',function(table){
    table.integer('idcuidador').notNullable().references('idcuidador').inTable('cuidador');
    table.integer('idevento').notNullable().references('idevento').inTable('evento');
    table.boolean('admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema//
    .dropTable('cuidador_evento')//
    .dropTable('cuidador_plaza')//
    .dropTable('evento')//
    .dropTable('cuidador')//
    .dropTable('plaza')//
};
