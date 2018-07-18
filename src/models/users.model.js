// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const { every, includes } = require('lodash');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },

    roles: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      validate: {
        isValideRole: array => {
          const valid = every(array, value => includes(['admin', 'developer', 'cto'], value));

          if(!valid){
            throw new Error('Validation isValidRole on roles failed');
          }
        }
      }
    },

    surname: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    forename: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },

    password: { type: DataTypes.STRING },
    password_digest: { type: DataTypes.STRING },

    password_reset_token: { type: DataTypes.STRING },
    password_reset_valid_until: { type: DataTypes.DATE },

    email_verify_token: { type: DataTypes.STRING },
    email_verify_valid_until: { type: DataTypes.DATE },
    email_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    email_verified_at: { type: DataTypes.DATE },

    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    locale: { type: DataTypes.STRING },

    profile_image: { type: DataTypes.JSON },
    cover_image: { type: DataTypes.JSON },

    timezone: { type: DataTypes.STRING },
    registered_at: { type: DataTypes.DATE },

    website: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    tagline: { type: DataTypes.STRING },

    gender: {
      type: DataTypes.STRING,
      validate: { isIn: [['female', 'male']]}
    },

    suspended_at: { type: DataTypes.DATE },
    suspended_by: { type: Sequelize.UUID },

    verified_at: { type: DataTypes.DATE },
    verified_by: { type: Sequelize.UUID },

    homezone_country_code: { type: DataTypes.STRING },
    homezone_city_code: { type: DataTypes.STRING },
    homezone_district_code: { type: DataTypes.STRING },
    homezone_zipcode: { type: DataTypes.STRING },
    address: { type: DataTypes.JSONB },

    last_logged_in_at: { type: DataTypes.DATE },
    consent_update_requested_at: { type: DataTypes.DATE, defaultValue: null },
    consents: { type: DataTypes.JSON, defaultValue: null },
    is_consenting_privacy_policy_and_terms: { type: DataTypes.BOOLEAN, defaultValue: null },
    is_consenting_public_profile: { type: DataTypes.BOOLEAN, defaultValue: null },
    is_consenting_newsletters: { type: DataTypes.BOOLEAN, defaultValue: null },

    created_by: { type: Sequelize.UUID },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
    deleted_at: { type: DataTypes.DATE },
  }, {
    underscored: true,
    tableName: 'users',
    freezeTableName: true,

    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};

