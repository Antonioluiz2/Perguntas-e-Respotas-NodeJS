const Sequelize =require('sequelize');
const connection =require('./database');

const Pergunta =connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    /*telefone:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.TEXT,
        allowNull: false
    }*/
});

Pergunta.sync({force: false})
.then(()=>{
    console.log('tabela criada')
})
.catch(()=>{
    console.log('Não foi criada')
});

module.exports = Pergunta;