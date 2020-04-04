const Usuarios = require('../models/usuario');


/**
 * Função para validar se os parametros informados são os necessários,
 * aos quais devem seguiir a seguinte regra:
 * 
 * usuario sendo um tipo string com 5 ou mais caracteres;
 * senha sendo do tipo string com 5 ou mais caracteres.
 * 
 * 
 * @param {object} propriedades 
 * @returns {boolean}
 */
function validarUsuario(propriedades) {
    return Object.keys(propriedades).includes('usuario') &&
        typeof (propriedades.usuario) === 'string' && propriedades.usuario.length >= 5
        && Object.keys(propriedades).includes('senha') &&
        typeof (propriedades.senha) === 'string' && propriedades.senha.length >= 5
}

exports.cadastrarUsuario = (req, res, next) => {
    if (validarUsuario(req.body)) {
        const novoUsuario = new Usuarios({
            usuario: req.body.usuario,
            senha: req.body.senha
        });
        novoUsuario.save((error, cadastro) => {
            if (error) {
                if (error.code === 11000) { return res.status(400).send({ message: 'Usuário já cadastrado.' }) }
                return res.status(500).send({
                    message: 'Não foi possível cadastrar esse usuário.',
                    erro: error
                });
            } else {
                return res.status(201).send({
                    message: 'Usuario cadastrada com sucesso.',
                    response: cadastro
                })
            }
        });
    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
};

exports.realizarLogin = (req, res, next) => {
    if (validarUsuario(req.body)) {
        Usuarios.findOne({ usuario: req.body.usuario }, (erro, usuario) => {
            if (usuario === null) { return res.status(400).send({ message: 'Usuário não cadastrado.' }) }
            if (erro) {
                return res.status(500).send(erro);
            } else if (usuario.senha === req.body.senha) {
                return res.status(200).send(usuario);
            } else {
                return res.status(400).send({ message: 'Falha de autenticação.' })
            }
        })
    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
};

exports.deletarUsuario = (req, res, next) => {
    const usuario = req.body.usuario;
    if (typeof (usuario) === 'string') {
        Usuarios.deleteOne({ usuario: usuario }, (error) => {
            if (error) {
                return res.status(500).send(error)
            } else {
                return res.status(200).send({ message: 'Usuário excluído com sucesso.' });
            }
        })
    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
};
