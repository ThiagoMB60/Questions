const sequelize = require("sequelize");
const connection = require("./database");

//definindo a tabela
const resposta = connection.define('resposta', {
	corpo:{
		type: sequelize.TEXT,
		allowNull: false
	},
	perguntaid:{
		type: sequelize.INTEGER,
		allowNull: false
	}
});

//sincronizando com o BD / force sendo false ele não irá criar a tabela caso ela já exista no BD
resposta.sync({force:false}).then(()=>{});


module.exports = resposta;