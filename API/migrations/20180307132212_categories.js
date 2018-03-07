exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', ( table ) =>{
    table.integer('id').primary()
    table.varchar('cat_name', 255).nullable()
    table.timestamp('updated_at').nullable().defaultsTo(null)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
}
