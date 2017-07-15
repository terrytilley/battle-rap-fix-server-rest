import knex from '../db/knex';

export const rollback = () => (
  knex.migrate.rollback()
);

export const migrate = () => (
  knex.migrate.latest()
);

export const seed = () => (
  knex.seed.run()
);
