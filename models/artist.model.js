import { Model } from 'objection';

class Artist extends Model {
  static get tableName() {
    return 'artists';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'real_name',
        'stage_name',
        'slug',
        'dob',
        'based',
        'country',
      ],

      properties: {
        id: { type: 'integer' },
        real_name: { type: 'string', minLength: 1, maxLength: 100 },
        stage_name: { type: 'string', minLength: 1, maxLength: 100 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
        dob: { type: 'string', format: 'date-time' },
        based: { type: 'string', minLength: 1, maxLength: 100 },
        country: { type: 'string', minLength: 1, maxLength: 100 },
        bio: { type: 'string', minLength: 1, maxLength: 500 },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default Artist;
