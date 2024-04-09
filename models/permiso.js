const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        unique: true
    },
    tipo: {
        type: String,
        required: true,
        emun: ['ADMINISTRADOR', 'AUDITOR', 'AUDITADO']
    },
    crear: {
        type: Boolean,
        default: true
    },
    leer: {
        type: Boolean,
        default: true
    },
    modificar: {
        type: Boolean,
        default: true
    },
    borrar: {
        type: Boolean,
        default: true
    },
    acceso: {
    type: String,
    default: ["all"],
    required: true,
    validate: {
        validator: function(v) {
            return v.includes('all') || v.length > 0;
        },
        message: 'Se debe especificar al menos una página o "all"',
    }},
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
});


CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categoria', CategoriaSchema );