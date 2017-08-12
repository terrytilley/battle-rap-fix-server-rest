import { Model } from 'objection';
import League from './league.model';

class Event extends Model {
  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'league_id',
        'name',
        'slug',
        'venue',
        'location',
        'date',
        'created_at',
      ],

      properties: {
        id: { type: 'integer' },
        league_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
        venue: { type: 'string', minLength: 1, maxLength: 200 },
        location: { type: 'string', minLength: 1, maxLength: 200 },
        date: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        join: {
          from: 'events.league_id',
          to: 'leagues.id',
        },
      },
    };
  }
}

export default Event;
