const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    username: {
        type: String,
        required: [true,'El username es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'El password es obligatorio']
    },
    tipo: {
        type: String,
        required: true,
        emun: ['ADMINISTRADOR', 'AUDITOR', 'AUDITADO']
    },
    cuenta_activa: {
        type: Boolean,
        required: true,
        default: true
    },
    ultimo_cambio_pass: {
        type: Date,
        default: null
    },
    ultimo_login: {
        type: Date,
        default: null
    },
    nombres: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true,'El apellidos es obligatorio']
    },
    carnet: {
        type: String,
        required: [true,'El carnet es obligatorio']
    },
    area: {
        type: String,
        required: [true,'El area es obligatorio']
    },
    cargo: {
        type: String,
        required: [true,'El cargo es obligatorio']
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema);