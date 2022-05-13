'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription', {
      id: Sequelize.INTEGER,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscription')
  },
}
