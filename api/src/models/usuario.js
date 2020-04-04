const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    usuario : {
        type: String,
        require: true,
        unique: true
    },
    senha: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios');
