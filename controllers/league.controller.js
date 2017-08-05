import moment from 'moment';
import slugify from '../lib/slugify';
import League from '../models/league.model';

export const createLeague = (req, res, next) => {
  req.sanitize('name').trim();
  req.sanitize('slogan').trim();
  req.sanitize('country').trim();

  req.checkBody('name', 'Invalid League Name').notEmpty();
  req.checkBody('country', 'Invalid Country').notEmpty();

  const userId = req.user.id;
  const leagueName = req.body.name;
  const nameSlug = slugify(req.body.name);
  const leagueSlogan = req.body.slogan;
  const leagueCountry = req.body.country;
  const createdAt = moment().format();

  const newLeague = {
    user_id: userId,
    name: leagueName,
    name_slug: nameSlug,
    slogan: leagueSlogan,
    country: leagueCountry,
    created_at: createdAt,
    active: true,
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return League
      .query()
      .insert(newLeague)
      .then((league) => {
        const { id, user_id, name, name_slug, slogan, country, active } = league;

        res.status(201).json({
          id,
          userId: user_id,
          name,
          nameSlug: name_slug,
          slogan,
          country,
          active,
        });
      })
      .catch(error => next(error));
  });
};

export const getAll = (req, res, next) => {
  League
  .query()
  .orderBy('id')
  .then(data => (
    res.status(200).json(data.map(({ id, user_id, name, name_slug, slogan, country, active }) => (
      {
        id,
        userId: user_id,
        name,
        nameSlug: name_slug,
        slogan,
        country,
        active,
      }
    ))))).catch(error => next(error));
};

export const getById = (req, res, next) => {
  League
    .query()
    .where('id', req.params.id)
    .first()
    .then((league) => {
      if (!league) return res.status(404).json({ message: 'League Not Found', error: {} });
      const { id, user_id, name, name_slug, slogan, country, active } = league;

      return res.status(200).json({
        id,
        userId: user_id,
        name,
        nameSlug: name_slug,
        slogan,
        country,
        active,
      });
    })
    .catch(error => next(error));
};

export const getBySlug = (req, res, next) => {
  League
    .query()
    .where('name_slug', req.params.slug)
    .first()
    .then((league) => {
      if (!league) return res.status(404).json({ message: 'League Not Found', error: {} });
      const { id, user_id, name, name_slug, slogan, country, active } = league;

      return res.status(200).json({
        id,
        userId: user_id,
        name,
        nameSlug: name_slug,
        slogan,
        country,
        active,
      });
    })
    .catch(error => next(error));
};
