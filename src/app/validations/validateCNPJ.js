// // Método para validar se um CPF é válido
// export function validaCPF(cpf) {
//   let soma = 0
//   let resto = 0

//   if (cpf === '00000000000') return false

//   for (let i = 1; i <= 9; i++) {
//     soma = soma + parseInt(cpf.toString().substring(i - 1, i)) * (11 - i)
//     resto = (soma * 10) % 11
//   }
//   if (resto === 10 || resto === 11) {
//     resto = 0
//   } else if (resto !== parseInt(cpf.toString().substring(9, 10))) return false
//   soma = 0
//   for (let i = 1; i <= 10; i++) {
//     soma = soma + parseInt(cpf.toString().substring(i - 1, i)) * (12 - i)
//     resto = (soma * 10) % 11
//   }
//   if (resto === 10 || resto === 11) {
//     resto = 0
//   }
//   if (resto !== parseInt(cpf.toString().substring(10, 11))) {
//     return false
//   } else return true
// }
