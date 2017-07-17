import User from '../models/user.model';

export const getAll = (req, res) => {
  User
    .query()
    .orderBy('id')
    .then(data => (
      res.status(200).json(data.map(({ id, display_name, username, email, active }) => (
        {
          id,
          username,
          email,
          displayName: display_name,
          active,
        }
      ))))).catch(error => res.status(500).json({ error }));
};

export const getById = (req, res) => {
  User
    .query()
    .where('id', req.params.id)
    .first()
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User Not Found' });
      const { id, display_name, username, email, active } = user;

      return res.status(200).json({
        id,
        username,
        email,
        displayName: display_name,
        active,
      });
    })
    .catch(error => res.status(500).json({ error }));
};

export const getByUsername = (req, res) => {
  User
    .query()
    .where('username', req.params.username)
    .first()
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User Not Found' });
      const { id, display_name, username, email, active } = user;

      return res.status(200).json({
        id,
        username,
        email,
        displayName: display_name,
        active,
      });
    })
    .catch(error => res.status(500).json({ error }));
};
