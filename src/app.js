// import express
import express from 'express'
import routes from './routes'
import cors from 'cors'

// Assim que a aplicação começar a rodar já irá instanciar a classe
import './database'

class App {
  constructor() {
    this.app = express()

    this.app.use(cors())
    this.middlewares()
    this.routes()
  }

  // interceptador -> Avisando para toda a aplicação que vamos usar o JSON
  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
