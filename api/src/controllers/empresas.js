const Empresas = require('../models/empresa');

exports.getTodasAsEmpresas = (req, res, next) => {
    Empresas.find({})
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
    Empresas.find({ idEmpresa: req.params.idEmpresa })
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
function validarConteudo(propriedades) {

    return Object.keys(propriedades).includes('idEmpresa') && typeof (propriedades.idEmpresa) === 'number'
        && Object.keys(propriedades).includes('latitude') && typeof (propriedades.latitude) === 'number'
        && Object.keys(propriedades).includes('longitude') && typeof (propriedades.longitude) === 'number'
        && Object.keys(propriedades).includes('nome') && typeof (propriedades.nome) === 'string';

}

exports.cadastrarEmpresa = (req, res, next) => {
    if (validarConteudo(req.body)) {
        const idEmpresa = req.body.idEmpresa;
        const coordenadas = [req.body.longitude, req.body.latitude];
        const propriedades = req.body;
        delete propriedades.idEmpresa;
        delete propriedades.longitude;
        delete propriedades.latitude;

        const novoCadastro = new Empresas({
            idEmpresa: idEmpresa,
            geoJson: {
                geometry: {
                    coordinates: coordenadas
                },
                properties: propriedades
            }
        });

        novoCadastro.save((error, cadastro) => {
            if (error) {
                if (error.code === 11000) { return res.status(400).send({ message: 'Já existe cadastro para essa empresa' }) }
                return res.status(500).send({
                    message: 'Não foi possível cadastrar essa empresa.',
                    erro: error
                });
            } else {
                return res.status(201).send({
                    message: 'Empresa cadastrada com sucesso.',
                    response: cadastro
                })
            }
        });
    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
}

exports.atualizarEmpresa = (req, res, next) => {
    const novoConteudo = Object.assign(req.body, { 'idEmpresa': +req.params.idEmpresa });
    if (validarConteudo(novoConteudo)) {
        const idEmpresa = novoConteudo.idEmpresa;
        const coordenadas = [novoConteudo.longitude, novoConteudo.latitude];
        const propriedades = novoConteudo;
        delete propriedades.idEmpresa;
        delete propriedades.longitude;
        delete propriedades.latitude;


        const atualizacao = {
            idEmpresa: idEmpresa,
            geoJson: {
                geometry: {
                    coordinates: coordenadas
                },
                properties: propriedades
            }
        };
        Empresas.findOneAndUpdate({ 'idEmpresa': idEmpresa }, atualizacao, (error) => {
            if (error) {
                return res.status(500).send({
                    message: 'Não foi possível atualizar o conteúdo da empresa.',
                    erro: error
                });
            } else {
                return res.status(200).send({ message: 'Dados atualizados com sucesso.' })
            }
        })

    } else {
        return res.status(400).send({ message: 'É necessário inserir um conteúdo válido.' })
    }
}

exports.deletarEmpresa = (req, res, next) => {
    const idEmpresa = +req.params.idEmpresa;
    if (!isNaN(idEmpresa)) {
        Empresas.deleteOne({ idEmpresa: idEmpresa }, (error) => {
            if (error) {
                return res.status(500).send(error)
            } else {
                return res.status(200).send({ message: 'Empresa excluída com sucesso.' });
            }
        });
    } else {
        return res.status(400).send({ message: 'É necessário informar um conteúdo válido.' })
    }
}