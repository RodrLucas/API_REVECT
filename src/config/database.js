module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'revect',
  database: 'REVECT',
  define: {
    timespamps: true, // Rastreabilidade -> Cria uma data de criação e uma data de update
    underscored: true,
    underscoredAll: true,
  },
}
