
/*
 * Faltou a coluna de zoom
 */
exports.up = function(knex, Promise) {
  return knex.schema.table("plaza",function(table){
    table.integer("zoom").defaultTo(20);
  })//
};

exports.down = function(knex, Promise) {
  return knex.schema.table("plaza",function(table){
      table.dropColumn("zoom");
  })
};
