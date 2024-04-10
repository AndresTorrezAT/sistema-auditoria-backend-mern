const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El titulo es obligatorio']
    },
    tipo: {
        type: String,
        enum: ['ADMINISTRADOR', 'AUDITOR', 'AUDITADO'],
        required: [true, 'Seleccionar un tipo de permiso es obligatorio']
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
        enum: ['ALL', 'SPECIFIC'],
        default: 'ALL',
        required: true
    },
    paginas: {
        type: [String],
        default: [],
        required: function() {
            return this.acceso === 'SPECIFIC';
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