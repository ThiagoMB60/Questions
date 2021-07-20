const sequelize = require("sequelize");
const connection = require("./database");

//definindo a tabela
const pergunta = connection.define('pergunta', {
	titulo:{
		type: sequelize.STRING,
		allowNull: false
	},
	descricao:{
		type: sequelize.TEXT,
		allowNull: false
	}
});

//sincronizando com o BD / force sendo false ele não irá criar a tabela caso ela já exista no BD
pergunta.sync({force:false}).then(()=>{});


module.exports = pergunta;