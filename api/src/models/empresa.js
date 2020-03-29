const mongoose = require('mongoose');

const empresaScheema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    idEmpresa: { 
        type: number, 
        required: true,
        unique: true
    },
    geoJson: {
        type: Object,
        required: true
    },
    created: Date
});

exports.module = mongoose.model('Empresa', empresaScheema);
