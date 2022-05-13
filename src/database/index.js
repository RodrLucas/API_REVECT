// CRIAR A CONEXÃO ENTRE O MODEL E O BANCO DE DADOS
import Sequelize from 'sequelize'

import Customer from '../app/models/Customer'
import Personal from '../app/models/Personal'
import configDatabase from '../config/database'

// models da aplicação
const models = [Customer, Personal]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()

// Assim que a classe Database é instanciada, é chamado o método constructor > init > cria as configurações para a conexão e depois manda as config para dentro do model
