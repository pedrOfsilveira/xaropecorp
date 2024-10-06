const { sequelize } = require ("../config/database");

module.exports = (sequelize, DataTypes)=>
{
    var Empregados = sequelize.define('empregados',

        {
            id:{
                type: DataTypes.BIGINT(20),
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING
            },
            salario:{
                type: DataTypes.DOUBLE
            },
            liquido:{
                type: DataTypes.DOUBLE
            },
            departamento:{
                type: DataTypes.STRING
            }

        },{
            timestamps:false
        }
   )
   // If there is not book table , create it. 
   // Books.sync ( { force:true });

   return Empregados

}


