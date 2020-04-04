const Usuarios = require('../models/usuario');

exports.getUsuario = (req, res, next) => {
    return res.status(200).send({message: 'getUsuario works.', response: req.params.idUsuario})
};

exports.cadastrarUsuario = (req, res, next) => {
    return res.status(200).send({message: 'getUsuario works.', response: req.body})
};

exports.realizarLogin = (req, res, next) => {
    return res.status(200).send({message: 'getUsuario works.', response: req.body})
};

exports.deletarUsuario = (req, res, next) => {
    return res.status(200).send({message: 'getUsuario works.', response: req.params.idUsuario})
};
