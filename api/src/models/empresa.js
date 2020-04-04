const mongoose = require('mongoose');

const empresaScheema = mongoose.Schema({
    idEmpresa: { 
        type: Number, 
        required: true,
        unique: true
    },
    geoJson: {
        type: {type: String, default: 'Feature'},
        geometry: {
            type: {type: String, default: 'Point'},
            coordinates: [Number, Number]
        },
        properties: {
            type: Object,
            required: true
        }
    },
    created: Date
});

module.exports = mongoose.model('Empresas', empresaScheema, 'empresas');
