import Artist from '../models/artist.model';

export const getAll = (req, res, next) => {
  Artist
    .query()
    .orderBy('id')
    .then((artists) => {
      if (artists.length <= 0) return res.status(404).json({ message: 'No Artists Found', error: {} });

      return res.status(200).json(artists.map(
        ({ id, real_name, stage_name, slug, dob, based, country, created_at }) => ({
          id,
          realName: real_name,
          stageName: stage_name,
          slug,
          dob,
          based,
          country,
          createdAt: created_at,
        }),
      ));
    })
    .catch(error => next(error));
};

export const getBySlug = (req, res, next) => {
  Artist
    .query()
    .where('slug', req.params.slug)
    .first()
    .then((artist) => {
      if (!artist) return res.status(404).json({ message: 'Artist Not Found', error: {} });
      const { id, real_name, stage_name, slug, dob, based, country, bio, created_at } = artist;

      return res.status(200).json({
        id,
        realName: real_name,
        stageName: stage_name,
        slug,
        dob,
        based,
        country,
        bio,
        createdAt: created_at,
      });
    })
    .catch(error => next(error));
};
