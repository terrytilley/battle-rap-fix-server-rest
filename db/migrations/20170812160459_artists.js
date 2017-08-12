exports.up = knex => (
  knex.schema.createTable('artists', (table) => {
    table.increments('id').notNullable().primary();
    table.string('real_name').notNullable();
    table.string('stage_name').notNullable();
    table.string('slug').notNullable();
    table.dateTime('dob').notNullable();
    table.string('based').notNullable();
    table.string('country').notNullable();
    table.string('bio').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('artists')
);
