const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        unique: true
    },
    tipo: {
        type: String,
        required: [true, 'Seleccionar el tipo es obligatorio'],
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
    tipo_acceso: {
        type: String,
        enum: ['all', 'specific'],
        default: 'all',
        required: true
    },
    paginas: {
        type: [String],
        validate: {
            validator: function(v) {
                return this.tipo_acceso === 'all' || (this.tipoAcceso === 'specific' && v.length > 0);
            },
            message: 'Debe especificar al menos una página si el acceso no es "all"'
        }
    },
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