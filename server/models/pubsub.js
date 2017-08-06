module.exports = (sequelize, DataTypes) => {
  const registrationToken = sequelize.define('pubsub', {
    deviceId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    token: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM,
      values: ['loggedIn', 'loggedOut', 'anon'],
      defaultValue: 'loggedIn'
    },
  }, {
    plural: 'pubsub',
    freezeTableName: true,
    hooks: {}
  });
  return registrationToken;
};
