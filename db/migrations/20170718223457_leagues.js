exports.up = knex => (
  knex.schema.createTable('leagues', (table) => {
    table.increments('id').notNullable().primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
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
