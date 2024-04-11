const { Router } = require('express'); 
const { check } = require('express-validator');


const { crearPermiso, 
        obtenerPermisos, 
        obtenerPermiso, 
        actualizarPermiso, 
        borrarPermiso } = require('../controllers/permisos.controller');

const router = Router();


//todo: CREATE
router.post('/', [
    validarJWT,

    validarCampos
   ], crearPermiso );

//todo: READ 
router.get('/', [
    validarJWT,

    validarCampos,
], obtenerPermisos );

router.get('/:id', [
    validarJWT,

    validarCampos,
], obtenerPermiso );


//todo: UPDATE
router.put('/:id', [
    validarJWT,

    validarCampos
], actualizarPermiso );


//todo: DELETE
router.delete('/:id', [
    validarJWT,

    validarCampos
], borrarPermiso );


module.exports = router;