const { response } = require("express");
const { Permiso } = require("../models");


// todo: CREATE

const crearPermiso = async( req, res = response ) => {

    const { estado, ...body } = req.body;
    const permisoDB = await Permiso.findOne({ nombre: body.titulo });

    if ( permisoDB ) {

        return res.status(400).json({
            msg: `El Permiso ${ permisoDB.titulo }, ya existe`
        });
        
    }

    // Generar la data a guardar
    const data = {
        ...body,
        titulo: body.titulo.toUpperCase()
    }

    const permiso = new Permiso( data );

    // Guardar DB

    await permiso.save();

    res.status(201).json(permiso);

}

// todo: READ

const obtenerPermisos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, permisos ] = await Promise.all([
        Permiso.countDocuments( query ),
        Permiso.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        permisos
    });

}

const obtenerPermiso = async( req, res = response) => {

    const { id } = req.params;
    const permiso = await Permiso.findById( id );

    res.json( permiso );

}

// todo: UPDATE

const actualizarPermiso = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if ( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();

    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );

}

// todo: DELETE

const borrarPermiso = async( req, res = response ) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( productoBorrado );

}


module.exports = {
    crearPermiso,
    obtenerPermisos,
    obtenerPermiso,
    actualizarPermiso,
    borrarPermiso
}