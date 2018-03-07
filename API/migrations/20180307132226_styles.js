exports.up = function(knex, Promise) {
  return knex.schema.createTable('styles', ( table ) =>{
    table.integer('id').primary()
    table.integer('cat_id').notNullable().defaultTo(0)
    table.varchar('style_name', 255).nullable()
    table.timestamp('updated_at').nullable().defaultsTo(null)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('styles')
}
