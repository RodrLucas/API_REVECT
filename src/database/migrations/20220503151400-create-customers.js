'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      // Campos da tabela de cadastro
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      cell_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      occupation: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  // Caso eu precise que a migration seja desfeita dar um dropTable que a tabela será desfeita
  async down(queryInterface) {
    await queryInterface.dropTable('customers')
  },
}
