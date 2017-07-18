exports.up = knex => (
  knex.schema.createTable('leagues', (table) => {
    table.increments('id').notNullable().primary();
    table.string('name').notNullable().unique();
    table.string('name_slug').notNullable().unique();
    table.string('slogan').nullable();
    table.string('country').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('active').notNullable();
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('leagues')
);
