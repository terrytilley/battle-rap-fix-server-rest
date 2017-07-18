exports.seed = knex => (
  knex('leagues').del()
    .then(() => (
      knex('leagues').insert({
        name: 'Don\'t Flop Entertainment',
        name_slug: 'dont-flop-entertainment',
        slogan: 'DFAFD',
        country: 'United Kingdom',
        active: true,
      })
    ))
    .then(() => (
      knex('leagues').insert({
        name: 'King of The Dot',
        name_slug: 'king-of-the-dot',
        slogan: 'Put Your Money Where Your Mouth Is',
        country: 'Canada',
        active: true,
      })
    ))
);
