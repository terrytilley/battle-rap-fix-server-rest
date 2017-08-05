exports.seed = knex => (
  knex('events').del()
  .then(() => (
    knex('events').insert({
      league_id: 1,
      name: 'REVIVAL 9INE',
      name_slug: 'revival-9ine',
      venue: 'Venue Nightclub',
      location: '29 Jackson Row Venue Nightclub Manchester',
      date: new Date('July, 8, 2017'),
    })
  ))
  .then(() => (
    knex('events').insert({
      league_id: 1,
      name: 'Latepril Fools',
      name_slug: 'latepril-fools',
      venue: 'Birtjdaus',
      location: 'Birtjdaus Dalston',
      date: new Date('June, 10, 2017'),
    })
  ))
  .then(() => (
    knex('events').insert({
      league_id: 1,
      name: 'The Last Word',
      name_slug: 'the-last-word',
      venue: 'Roundhouse',
      location: 'Roundhouse London',
      date: new Date('June, 2, 2017'),
    })
  ))
  .then(() => (
    knex('events').insert({
      league_id: 2,
      name: 'Massacre 3',
      name_slug: 'massacre-3',
      venue: 'Worcester',
      location: 'Worcester, Massachusetts',
      date: new Date('July, 23, 2017'),
    })
  ))
  .then(() => (
    knex('events').insert({
      league_id: 2,
      name: 'Blackout 7',
      name_slug: 'blackout-7',
      venue: 'The Capitol Event Theatre',
      location: '2492 Yonge St The Capitol Event Theatre Toronto, Ontario',
      date: new Date('April, 14, 2017'),
    })
  ))
);
