module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pubsub', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      userType: {
        type: Sequelize.ENUM,
        values: ['seller', 'admin', 'user'],
      },
      token: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['loggedIn', 'loggedOut', 'anon'],
        defaultValue: 'anon'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pubsub');
  }
};
