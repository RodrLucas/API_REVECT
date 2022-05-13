// store => Cadastros / Adicionar
// index => Listar vários
// show => Listar apenas UM
// update => Atualizar
// delete => Deletar

import * as Yup from 'yup'
import Customer from '../models/Customer'
import { validarCPF } from '../validations/validateCPF'
// import { validate } from 'validate-phone-number-node-js'
import validator from 'validar-telefone'

class CustomerController {
  async store(request, response) {
    // Validando se as informações que chegaram pelo body são corretas
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().min(11).required(),
      genre: Yup.string().required(),
      birth: Yup.date().max(new Date().toLocaleDateString()).required(),
      cell_phone: Yup.string().required(),
      occupation: Yup.string(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      postal_code: Yup.string().required(),
    })
    // Caso tenha algum erro na resposta enviada, a aplicação retornará uma mensagem detalhando qual foi o erro
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      name,
      email,
      cpf,
      genre,
      birth,
      cell_phone,
      occupation,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      postal_code,
    } = request.body

    // Validando se um email já existe no banco de dados
    const customerEmailExists = await Customer.findOne({
      where: { email },
    })

    // Validando se o CPF é válido
    if (!validarCPF(cpf)) {
      return response.status(400).json({ error: 'CPF inválido' })
    }

    // Validando se um CPF já existe no banco de dados
    const customerCpfExists = await Customer.findOne({
      where: { cpf },
    })

    // Caso Email ou CPF já existir no banco de dados, retorna uma mensagem para o usuário
    if (customerEmailExists || customerCpfExists) {
      return response.status(409).json({ error: 'Cliente já existe' })
    }

    // Validando se o cell_phone é valido
    if (
      !validator(cell_phone, {
        codigoAreaPossivel: true,
        codigoPaisPresente: true,
        codigoPaisPossivel: true,
      })
    ) {
      return response
        .status(400)
        .json({ error: 'Celular inválido - Deve ser: +55 (DDD) 9XXXX-XXXX' })
    }

    // Enviando para o banco de dados e criando um novo client
    const newCustomer = await Customer.create({
      name,
      email,
      cpf,
      genre,
      birth,
      cell_phone,
      occupation,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      postal_code,
    })

    return response.status(201).json(newCustomer)
  }

  async index(request, response) {
    const customers = await Customer.findAll()
    return response.json(customers)
  }

  async update(request, response) {
    // Validando se as informações que chegaram pelo body são corretas
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string(),
      genre: Yup.string(),
      birth: Yup.date().max(new Date().toLocaleDateString()),
      cell_phone: Yup.string(),
      occupation: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      district: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      postal_code: Yup.string(),
    })
    // Caso tenha algum erro na resposta enviada, a aplicação retornará uma mensagem detalhando qual foi o erro
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    // Buscando ID pelo request.params
    const { customer_id } = request.params

    // retornar customer do banco de dados pelo ID
    const customer = await Customer.findByPk(customer_id)

    // Validando se o Customer existe no banco de dados
    if (!customer) {
      return response
        .status(401)
        .json({ error: 'Certifique-se que seu ID está correto' })
    }

    const {
      name,
      email,
      cpf,
      genre,
      birth,
      cell_phone,
      occupation,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      postal_code,
    } = request.body

    // Validando se o CPF é válido
    // if (cpf) {
    //   if (!validarCPF(cpf)) {
    //     return response.status(400).json({ error: 'CPF inválido' })
    //   }
    // }

    // Validando se o cell_phone é valido
    // if (
    //   !validator(cell_phone, {
    //     codigoAreaPossivel: true,
    //     codigoPaisPresente: true,
    //     codigoPaisPossivel: true,
    //   })
    // ) {
    //   return response
    //     .status(400)
    //     .json({ error: 'Celular inválido - Deve ser: +55 (DDD) 9XXXX-XXXX' })
    // }

    // Enviando para o banco de dados e criando um novo client
    await Customer.update(
      {
        name,
        email,
        cpf,
        genre,
        birth,
        cell_phone,
        occupation,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
        postal_code,
      },
      { where: { customer_id } }
    )

    return response.status(201).json()
  }
}

export default new CustomerController()
