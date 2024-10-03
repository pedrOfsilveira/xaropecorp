const { sequelize, Sequelize } = require('../config/database');
const empregadosModel = require('../models/empregados')(sequelize, Sequelize);

exports.showAll = (req, res) => {
  empregadosModel
    .findAll({})
    .then(results => {
      console.log(results);
      res.render('showAllView', { layout: false, results_form: results });
    })
    .catch(err => {
      res.status(500).send({ message: 'Error' + err.message });
    });
};

exports.insertData = (req, res) => {
  const empregadosData = {
    nome: req.body.nome,
    salario: req.body.salario - 10,
    departamento: req.body.departamento,
  };

  empregadosModel
    .create(empregadosData)
    .then(data => {
      console.log('Empregados inserted');
      res.redirect('/');
    })
    .catch(err => {
      console.log('Error' + err);
    });
};

exports.showForm = (req, res) => {
  res.render('form', { layout: false });
};

exports.delete = (req, res) => {
  const id_param = req.params.id;
  empregadosModel
    .destroy({
      where: { id: id_param },
    })
    .then(result => {
      if (!result) {
        req.status(400).json({ message: 'An error occurred...' });
      }
      res.redirect('/showall');
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not delete such object.' });
      console.log(err);
    });
};

exports.editForm = (req, res) => {
  const id_param = req.params.id;
  empregadosModel
    .findByPk(id_param)
    .then(result => {
      res.render('editform', {
        layout: false,
        id: id_param,
        results_data: result,
      }); // render
    })
    .catch(err => {
      res.status(500).json({ message: 'Error... Je suis désolé...' });
      console.log(err);
    }); //catch
}; // editForm

exports.update = (req, res) => {
  empregadosModel
    .update(
      {
        nome: req.body.nome,
        salario: req.body.salario,
        departamento: req.body.departamento,
      },
      {
        where: { id: req.body.id_for_updating },
      }
    )
    .then(anything => {
      if (!anything) {
        req.status(400).send({ message: 'An error ocurred.' });
      }
      res.redirect('/showall');
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error when trying to access the database',
      });
    });
}; // update
