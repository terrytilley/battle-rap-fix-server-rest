import League from '../models/league.model';

export const getAll = (req, res) => {
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
    ))))).catch(error => res.status(500).json({ error }));
};
