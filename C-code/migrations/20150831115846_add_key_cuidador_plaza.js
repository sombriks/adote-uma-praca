
exports.up = function(knex, Promise) {
  return knex.schema.table("cuidador_plaza",function(table){
      table.primary(["idcuidador","idplaza"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.raw("alter table cuidador_plaza drop constraint cuidador_plaza_pkey");
};
