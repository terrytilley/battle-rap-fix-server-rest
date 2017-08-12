exports.seed = knex => (
  knex('artists').del()
  .then(() => (
    knex('artists').insert({
      real_name: 'Adam Rooney',
      stage_name: 'Shotty Horroh',
      slug: 'shotty-horroh',
      dob: new Date('September, 22, 1986'),
      based: 'Manchester',
      country: 'United Kingdom',
      bio: 'Shotty Horroh is a UK Battler who made his Don\'t Flop debut in 2011 against Disciple.',
    })
  ))
  .then(() => (
    knex('artists').insert({
      real_name: 'Jake Brook',
      stage_name: 'Lunar C',
      slug: 'lunar-c',
      dob: new Date('June, 21, 1990'),
      based: 'Bradford',
      country: 'United Kingdom',
      bio: 'Lunar C is a rapper from west Yorkshire Bradford, Real name Jake Brook most commonly know as Lunar C as this is his stage name.',
    })
  ))
  .then(() => (
    knex('artists').insert({
      real_name: 'Bachir "Kirā" Yagami',
      stage_name: 'Dizaster',
      slug: 'dizaster',
      dob: new Date('June, 21, 1990'),
      based: 'Los Angeles',
      country: 'USA',
      bio: 'Dizaster is a former King of the Dot champion who has battled in numerous other leagues including GrindTime, Don\'t Flop and URL, as well as in Norway, Sweden, Australia and the Phillipines.',
    })
  ))
  .then(() => (
    knex('artists').insert({
      real_name: 'Micky Worthless',
      stage_name: 'Micky Worthless',
      slug: 'micky-worthless',
      dob: new Date('January, 01, 1985'),
      based: 'Croydon',
      country: 'United Kingdom',
      bio: 'Micky Worthless is a UK Battler who made his Don\'t Flop debut against Deadly Nightshade in 2011.',
    })
  ))
);
