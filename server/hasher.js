const bcrypt = require('bcrypt');
const saltRounds = 10;
const plaintextPassword = 'password';

bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    console.log(hash);
});