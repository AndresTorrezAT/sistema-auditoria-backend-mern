
const { Router } = require('express'); // para configurar rutas
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

        
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios.controller');





const router = Router();

router.get('/', usuariosGet); // usuariosGet y demas... Son referencias de la funcion, no son ejecuciones

router.post('/',[
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El nombre es obligatorio').not().isEmpty(), 
    check('tipo', 'No es un tipo de usuario válido').isIn(['ADMINISTRADOR','AUDITOR', 'AUDITADO']),
    validarCampos
], usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], usuariosPut ); // expres parsea y configura el :id y icluso te lo da de variable

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch);





module.exports = router;