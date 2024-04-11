
const { Router } = require('express');
const { check } = require('express-validator');


const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido,
        emailExiste,
        existeUsuarioPorId } = require('../helpers/db-validators');

        
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios.controller');


const router = Router();

router.get('/', usuariosGet); // usuariosGet y demas... Son referencias de la funcion, no son ejecuciones

router.post('/',[
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),  
    check('correo').custom( emailExiste ),  
    check('tipo', 'No es un rol válido').isIn(['ADMINISTRADOR','AUDITOR', 'AUDITADO']),
    // check('rol').custom( esRoleValido ), consulta en la base de datos
    validarCampos
], usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut ); // expres parsea y configura el :id y icluso te lo da de variable

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch);





module.exports = router;