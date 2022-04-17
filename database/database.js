const Sequelize =require('sequelize');
const connection =new Sequelize('guiperguntas', 'root','Luka.2017',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;
