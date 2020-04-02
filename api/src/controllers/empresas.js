const Empresa = require('../models/empresa');

exports.getTodasAsEmpresas = (req, res, next) => {
    Empresa.find({})
        .exec()
        .then(response => {
            const vetorGeoJson = response.map(document => document.geoJson)
            return res.status(200).send({ features: vetorGeoJson })
        })
        .catch(error => {
            return res.status(500).send({ message: error })
        })
}

exports.getEmpresa = (req, res, next) => {
    Empresa.find({ idEmpresa: req.params.idEmpresa })
        .exec()
        .then(response => {
            if (response.length) {
                return res.status(200).send({ response })
            } else {
                return res.status(404).send({ response: 'Empresa não encontrada.' })
            }
        })
        .catch(error => {
            return res.status(500).send({ message: error })
        })
}


/**
 * Função para validar se há o mínimo de informação exigida pelo o sistema,
 * sendo elas:
 * 
 * idEmpresa sendo um valor inteiro;
 * Conter informações a respeito da latitude e longitude;
 * Ter um nome.
 * 
 * 
 * @param {object} propriedades 
 * @returns {boolean}
 */
function validarConteudoDoCadastro(propriedades) {

    return Object.keys(propriedades).includes('idEmpresa') && typeof (propriedades.idEmpresa) === 'number'
        && Object.keys(propriedades).includes('latitude') && typeof (propriedades.latitude) === 'number'
        && Object.keys(propriedades).includes('longitude') && typeof (propriedades.longitude) === 'number'
        && Object.keys(propriedades).includes('nome') && typeof (propriedades.nome) === 'string';

}

exports.cadastrarEmpresa = (req, res, next) => {
    console.log(req.body)
    if (validarConteudoDoCadastro(req.body)) {
        const idEmpresa = req.body.idEmpresa;
        const coordenadas = [req.body.longitude, req.body.latitude];
        const propriedades = req.body;
        delete propriedades.idEmpresa;
        delete propriedades.longitude;
        delete propriedades.latitude;

        const novoCadastro = new Empresa({
            idEmpresa: idEmpresa,
            geoJson: {
                geometry: {
                    coordinates: coordenadas
                },
                properties: propriedades
            }
        });
        
        novoCadastro.save((error, novoCadastro) => {
            if (error) {
                if (error.code === 11000) { return res.status(400).send({ message: 'Já existe cadastro para essa empresa' }) }
                return res.status(500).send({
                    message: 'Não foi possível cadastrar essa empresa.',
                    erro: error
                });
            } else {
                return res.status(201).send({
                    message: 'Empresa cadastrada com sucesso.',
                    empresa: novoCadastro
                })
            }
        });
    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
}

exports.atualizarEmpresa = (req, res, next) => {
    return res.status(200).send({
        message: 'atualizarEmpresa works',
    })
}

exports.deletarEmpresa = (req, res, next) => {
    return res.status(200).send({
        message: 'deletarEmpresa works',
    })
}