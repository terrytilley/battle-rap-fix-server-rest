exports.up = knex => (
  knex.schema.createTable('events', (table) => {
    table.increments('id').notNullable().primary();
    table.integer('league_id').unsigned();
    table.foreign('league_id').references('id').inTable('leagues').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.string('venue').notNullable();
    table.string('location').notNullable();
    table.dateTime('date').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('events')
);
