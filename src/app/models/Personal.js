import Sequelize, { Model } from 'sequelize'

// Extendendo (herança) a classe Model dentro da classe Client
class Personal extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.CHAR,
        genre: Sequelize.STRING,
        birth: Sequelize.DATEONLY,
        cell_phone: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        district: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        postal_code: Sequelize.BIGINT,
      },
      {
        sequelize,
      }
    )
  }
}

export default Personal
