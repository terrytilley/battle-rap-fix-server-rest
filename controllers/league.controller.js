import League from '../models/league.model';

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
