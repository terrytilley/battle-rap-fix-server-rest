const bcrypt = require('bcryptjs');

exports.seed = knex => (
  knex('users').del()
    .then(() => (
      knex('users').insert({
        display_name: 'Terry Tilley',
        username: 'terryt88',
        email: 'terry@terrytilley.com',
        password: bcrypt.hashSync('qwerty123'),
        reset_password_token: null,
        reset_password_expires: null,
        active: true,
      })
    ))
    .then(() => (
      knex('users').insert({
        display_name: 'Reece Freed',
        username: 'reecef91',
        email: 'reece@reecefreed.com',
        password: bcrypt.hashSync('qwerty123'),
        reset_password_token: null,
        reset_password_expires: null,
        active: true,
      })
    ))
    .then(() => (
      knex('users').insert({
        display_name: 'Jason Maddrell',
        username: 'jasonm88',
        email: 'jason@jasonmaddrell.com',
        password: bcrypt.hashSync('qwerty123'),
        reset_password_token: null,
        reset_password_expires: null,
        active: true,
      })
    ))
    .then(() => (
      knex('users').insert({
        display_name: 'Jack Walker',
        username: 'jackw88',
        email: 'jack@jackwalker.com',
        password: bcrypt.hashSync('qwerty123'),
        reset_password_token: null,
        reset_password_expires: null,
        active: true,
      })
    ))
);
