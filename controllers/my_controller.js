const { sequelize, Sequelize } = require('../config/database');
const empregadosModel = require('../models/empregados')(sequelize, Sequelize);
const { Op } = require('sequelize');

exports.showAll = (req, res) => {
  empregadosModel
    .findAll({})
    .then(results => {
      res.render('showAllView', { layout: false, results_form: results });
    })
    .catch(err => {
      res.status(500).send({ message: 'Error' + err.message });
    });
};

exports.insertData = (req, res) => {
  let salarioBruto = parseFloat(req.body.salario).toFixed(2);
  let inss = salarioBruto * 0.11;
  let irpf;

  if (salarioBruto <= 1903.98) {
    irpf = 0;
  }
  if (salarioBruto > 1903.98 && salarioBruto <= 2826.65) {
    irpf = salarioBruto * 0.075;
  }
  if (salarioBruto > 2826.65 && salarioBruto <= 3751.06) {
    irpf = salarioBruto * 0.15;
  }
  if (salarioBruto > 3751.06 && salarioBruto <= 4664.68) {
    irpf = salarioBruto * 0.075;
  }
  if (salarioBruto > 4664.68) {
    irpf = salarioBruto * 0.275;
  }

  let salarioLiquido = (salarioBruto - inss - irpf).toFixed(2);

  const empregadosData = {
    nome: req.body.nome,
    salario: salarioBruto,
    liquido: salarioLiquido,
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

exports.pesquisa = (req, res) => {
  let param = req.body.pesquisa;
  empregadosModel
    .findAll({
      where: {
        nome: {
          [Op.like]: `%${param}%`,
        },
      },
    })
    .then(anything => {
      res.render('showAllView', { layout: false, results_form: anything });
    });
};

exports.nome = (req, res) => {
  this.ordena(req, res, 'nome');
};
exports.bruto = (req, res) => {
  this.ordena(req, res, 'salario');
};
exports.liquido = (req, res) => {
  this.ordena(req, res, 'liquido');
};
exports.id = (req, res) => {
  this.ordena(req, res, 'id');
};
exports.departamento = (req, res) => {
  this.ordena(req, res, 'departamento');
};

exports.ordena = (req, res, atributo) => {
  const ordem = req.body[atributo] === 'asc' ? 'ASC' : 'DESC';

  empregadosModel
    .findAll({
      order: [[atributo, ordem]],
    })
    .then(anything => {
      if (!req.body[atributo]) {
        res.render('showAllView', {
          layout: false,
          results_form: anything,
          ascDesc: 'asc',
        });
      } else {
        res.render('showAllView', {
          layout: false,
          results_form: anything,
          ascDesc: req.body[atributo] === 'asc' ? 'desc' : 'asc',
        });
      }
    });
};
