// store => Cadastros / Adicionar
// index => Listar vários
// show => Listar apenas UM
// update => Atualizar
// delete => Deletar

import * as Yup from 'yup'
import Personal from '../models/Personal'
import { validarCPF } from '../validations/validateCPF'
// import { validate } from 'validate-phone-number-node-js'
import validator from 'validar-telefone'

class PersonalController {
  async store(request, response) {
    // Validando se as informações que chegaram pelo body são corretas
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().min(11).required(),
      genre: Yup.string().required(),
      birth: Yup.date().max(new Date().toLocaleDateString()).required(),
      cell_phone: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
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
    const personalEmailExists = await Personal.findOne({
      where: { email },
    })

    // Validando se um CPF já existe no banco de dados
    const persoanlCpfExists = await Personal.findOne({
      where: { cpf },
    })

    // Validando se o CPF é válido
    if (!validarCPF(cpf)) {
      return response.status(400).json({ error: 'CPF inválido' })
    }

    // Caso Email ou CPF for inválido, retorna uma mensagem para o usuário
    if (personalEmailExists || persoanlCpfExists) {
      return response.status(400).json({ error: 'Personal já cadastrado' })
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
    const newPersonal = await Personal.create({
      name,
      email,
      cpf,
      genre,
      birth,
      cell_phone,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      postal_code,
    })

    return response.status(201).json(newPersonal)
  }
}

export default new PersonalController()
