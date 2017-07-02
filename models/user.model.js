import { Model } from 'objection';

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
        'active',
        'created_at',
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
}

export default User;
