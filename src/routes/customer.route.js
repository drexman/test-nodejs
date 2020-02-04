const express = require('express');
const router = express.Router();
                          
const controller = require('../controllers/customer.controller');

//Consulta das informações
router.get('/:id', controller.findByFileId);
//Atualizar cliente
router.put('/:id', controller.update);
//Remover cliente
router.delete('/:id', controller.delete);


module.exports = router;