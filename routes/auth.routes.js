const { Router } = require('express'); // para configurar rutas
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('username', 'El username es obligatorio').not().isEmpty(),   
    check('password', 'El password es obligatorio').not().isEmpty(),  
    validarCampos
], login );

module.exports = router;