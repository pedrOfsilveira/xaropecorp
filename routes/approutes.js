const express = require('express');
const router = express.Router();
var myController = require('../controllers/my_controller');

router.get('/', myController.showForm);
router.post('/', myController.insertData);
router.get('/showall', myController.showAll);
router.get('/delete/:id', myController.delete);
router.get('/edit/:id', myController.editForm);
router.post('/update', myController.update);
router.post('/search', myController.pesquisa);
router.post('/orderByNome', myController.nome);
router.post('/orderById', myController.id);
router.post('/orderByBruto', myController.bruto);
router.post('/orderByDepartamento', myController.departamento);

module.exports = router;
