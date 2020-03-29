exports.getTodasAsEmpresas = (req, res, next) => {
    return res.status(200).send({
        message: 'getTodasAsEmpresas works',
    })
}

exports.getEmpresa = (req, res, next) => {
    return res.status(200).send({
        message: 'getEmpresa works',
    })
}

exports.cadastrarEmpresa = (req, res, next) => {
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