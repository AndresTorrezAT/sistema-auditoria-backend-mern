const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response ) => {

    const { username, password, tipo, nombres, apellidos, carnet, correo, area, cargo } = req.body; // el body de la request
    const usuario = new Usuario({ username, password, tipo, nombres, apellidos, carnet, correo, area, cargo });
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, correo, ...resto} = req.body;

    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response ) => {
    res.json({
  
        msg: 'patch API - controlador'

    });
}

const usuariosDelete = async(req, res = response ) => {

    const { id } = req.params;
    const autenticado = req.usuario;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}

