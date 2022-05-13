import { Router } from 'express'

import CustomerController from './app/controllers/CustomerController'
import PersonalController from './app/controllers/PersonalController'
const routes = new Router()

routes.post('/customer', CustomerController.store)
routes.get('/customer', CustomerController.index)
routes.put('/customer/:id', CustomerController.update)

routes.post('/personal', PersonalController.store)

export default routes
