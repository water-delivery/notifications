module.exports = (sequelize, DataTypes) => {
  const registrationToken = sequelize.define('pubsub', {
    deviceId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM,
      values: ['seller', 'admin', 'user'],
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
    status: {
      type: DataTypes.ENUM,
      values: ['loggedIn', 'loggedOut', 'anon'],
      defaultValue: 'loggedIn'
    },
  }, {
    freezeTableName: true,
    hooks: {}
  });
  return registrationToken;
};
