
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('vendor_id').notNullable();

        table.foreign('vendor_id').references('id').inTable('vendors');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
