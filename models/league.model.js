import { Model } from 'objection';
import User from './user.model';
import Event from './event.model';

class League extends Model {
  static get tableName() {
    return 'leagues';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_id',
        'name',
        'slug',
        'country',
        'created_at',
        'active',
      ],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
        slogan: { type: 'string', minLength: 1, maxLength: 150 },
        country: { type: 'string', minLength: 1, maxLength: 50 },
        created_at: { type: 'string', format: 'date-time' },
        active: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'leagues.user_id',
          to: 'users.id',
        },
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'leagues.id',
          to: 'events.league_id',
        },
      },
    };
  }
}

export default League;
