const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

    const { username, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ username });
        if( !usuario ){

            return res.status(400).json({
                msg: 'Username / Password no son correctos'
            });

        }

        // SI el usuario esta activo
        if( !usuario.estado ){

            return res.status(400).json({
                msg: 'Cuenta Deshabilitada'
            });

        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){

            return res.status(400).json({
                msg: 'usuario / Password no son correctos - password'
            });

        }

        // Generar el JWT

        const token = await generarJWT( usuario.id );

        // Actualizar ultimo login
        const fechaActual = new Date().toLocaleString();
        const ultimo_login = await Usuario.findByIdAndUpdate( usuario.id, { ultimo_login: fechaActual  } );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }

}




module.exports = {
    login
}