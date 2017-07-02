exports.up = knex => (
  knex.schema.createTable('users', (table) => {
    table.increments('id').notNullable().primary();
    table.string('display_name').notNullable();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('reset_password_token').nullable();
    table.dateTime('reset_password_expires').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('active').notNullable();
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('users')
);
