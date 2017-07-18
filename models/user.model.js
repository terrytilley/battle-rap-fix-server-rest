import { Model } from 'objection';
import League from './league.model';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'display_name',
        'username',
        'email',
        'password',
        'created_at',
        'active',
      ],

      properties: {
        id: { type: 'integer' },
        display_name: { type: 'string', minLength: 1, maxLength: 50 },
        username: { type: 'string', minLength: 3, maxLength: 25 },
        email: { type: 'string', minLength: 6, maxLength: 30 },
        reset_password_token: { type: ['string', 'null'] },
        reset_password_expires: { type: ['string', 'null'], format: 'date-time' },
        password: { type: 'string', minLength: 8, maxLength: 100 },
        active: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      leagues: {
        relation: Model.HasManyRelation,
        modelClass: League,
        join: {
          from: 'users.id',
          to: 'leagues.user_id',
        },
      },
    };
  }
}

export default User;
