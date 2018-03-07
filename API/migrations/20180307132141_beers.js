exports.up = function(knex, Promise) {
  return knex.schema.createTable('beers', ( table ) =>{
    table.integer('id').primary()
    table.integer('brewery_id').notNullable().defaultTo(0)
    table.varchar('name', 255).notNullable().defaultTo('')
    table.integer('cat_id').notNullable().defaultTo(0)
    table.integer('style_id').notNullable().defaultTo(0)
    table.float('abv').notNullable().defaultTo(0)
    table.float('ibu').notNullable().defaultTo(0)
    table.float('srm').notNullable().defaultTo(0)
    table.integer('upc').notNullable().defaultTo(0)
    table.varchar('filepath', 255).nullable()
    table.text('descript').nullable()
    table.timestamp('updated_at').nullable().defaultsTo(null)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beers')
};
