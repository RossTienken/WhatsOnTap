
exports.up = function(knex, Promise) {
  return knex.schema.createTable('breweries', ( table ) =>{
    table.integer('id').primary()
    table.varchar('name', 255).nullable()
    table.varchar('address1', 255).nullable()
    table.varchar('address2', 255).nullable()
    table.varchar('city', 255).nullable()
    table.varchar('state', 255).nullable()
    table.varchar('code', 255).nullable()
    table.varchar('country', 255).nullable()
    table.varchar('phone', 255).nullable()
    table.varchar('website', 255).nullable()
    table.varchar('filepath', 255).nullable()
    table.text('descript').nullable()
    table.timestamp('updated_at').nullable().defaultsTo(null)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('breweries')
};
