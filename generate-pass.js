//Necessário deixar no módulo raiz para utilizar o param no cli, não é possível utilizar o import por conta da verificação de módulos
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const saltRounds = 10; //força da criptografia
const password = process.argv.slice(2)[0];

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(password, salt, function (err, hash) {
    console.log(hash);
  });
});
