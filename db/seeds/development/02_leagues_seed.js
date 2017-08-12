exports.seed = knex => (
  knex('leagues').del()
    .then(() => (
      knex('leagues').insert({
        user_id: 1,
        name: 'Don\'t Flop Entertainment',
        slug: 'dont-flop-entertainment',
        slogan: 'DFAFD',
        country: 'United Kingdom',
        active: true,
      })
    ))
    .then(() => (
      knex('leagues').insert({
        user_id: 2,
        name: 'King of The Dot',
        slug: 'king-of-the-dot',
        slogan: 'Put Your Money Where Your Mouth Is',
        country: 'Canada',
        active: true,
      })
    ))
    .then(() => (
      knex('leagues').insert({
        user_id: 3,
        name: 'King of The Ronalds',
        slug: 'king-of-the-ronalds',
        country: 'United Kingdom',
        active: true,
      })
    ))
);
