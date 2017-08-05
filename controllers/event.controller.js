import League from '../models/league.model';

export const leagueEvents = (req, res, next) => {
  League
    .query()
    .where('name_slug', req.params.slug)
    .first()
    .eager('events')
    .then(({ events }) => {
      if (events.length <= 0) return res.status(404).json({ message: 'No Events Found', error: {} });

      return res.status(200).json(events.map(
        ({ id, league_id, name, name_slug, venue, location, date }) => ({
          id,
          leagueId: league_id,
          name,
          nameSlug: name_slug,
          venue,
          location,
          date,
        }),
      ));
    })
    .catch(error => next(error));
};
