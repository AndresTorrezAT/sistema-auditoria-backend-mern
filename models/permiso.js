const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    tipo: {
        type: String,
        required: true,
        emun: ['ADMINISTRADOR', 'AUDITOR', 'AUDITADO']
    },
    crear: {
        type: Boolean,
        default: true,
        required: true
    },
    leer: {
        type: Boolean,
        default: true,
        required: true
    },
    modificar: {
        type: Boolean,
        default: true,
        required: true
    },
    borrar: {
        type: Boolean,
        default: true,
        required: true
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
        default: Date.now,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
});


PermisoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Permiso', PermisoSchema );