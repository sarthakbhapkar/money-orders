const bcrypt = require('bcrypt');

bcrypt.hash('sarthak', 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hash);
    }
});
