const Empresas = require('../models/empresa');

exports.getTodasAsEmpresas = (req, res, next) => {
    Empresas.find({})
        .exec()
        .then(response => {
            const vetorGeoJson = response.map(document => document.geoJson)
            return res.status(200).send({features: vetorGeoJson})
        })
        .catch(error => {
            return res.status(500).send({message: error})
        })
}

exports.getEmpresa = (req, res, next) => {
    Empresas.find({idEmpresa: req.params.idEmpresa})
        .exec()
        .then(response => {
            if (response.length) {
                return res.status(200).send({response})
            } else {
                return res.status(404).send({response: 'Empresa não encontrada.'})
            }
        })
        .catch(error => {
            return res.status(500).send({message: error})
        })
}

exports.cadastrarEmpresa = (req, res, next) => {
    if (isNaN(+req.params.idEmpresa) || req.body.length) { 
        return res.status(400).send({message: 'É necessário inserir um corpot e ID válido.'})
    }
    try {
        const novoCadastro = new Empresas({
            idEmpresa: req.params,
            geoJson: {
                geometry: {
                    coordinates: [req.body.longitude, req.body.latitude]
                },
                properties: req.body
            }
        })
        novoCadastro.save((err, novoCadastro) => {
            if (err) { return res.status(400).send({message: err})};
            return res.status(201).send({message: 'Empresa cadastrada com sucesso', registro: novoCadastro});
        })
    } catch (error) {
        
    }
    

    return res.status(200).send({
        message: 'cadastrarEmpresa works',
    })
}

exports.atualizarEmpresa = (req , res, next) => {
    return res.status(200).send({
        message: 'atualizarEmpresa works',
    })
}

exports.deletarEmpresa = (req, res, next) => {
    return res.status(200).send({
        message: 'deletarEmpresa works',
    })
}