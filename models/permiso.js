const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    tipo: {
        type: String,
        emun: ['ADMINISTRADOR', 'AUDITOR', 'AUDITADO'],
        required: [true,'Seleccionar un tipo de usuario es obligatorio']
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
                return this.tipoAcceso === 'specific' ? v.length > 0 : true;
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


CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categoria', CategoriaSchema );