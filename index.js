const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/Pergunta");
const resposta = require("./database/Resposta");

//Database
connection
	.authenticate()
	.then(()=>{
		console.log("Conexão executada com sucesso!")
	})
	.catch((msgErro)=>{
		console.log("A conexão com o Database falhou!")
	})

//Passando para o express qual view utilizar, nesse caso o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
	pergunta.findAll({raw: true, order: [
			['id', 'DESC'] // ordenando o arrey pelo 'id' de forma decrescente, para crescente usar o ASC
		]}).then(perguntas =>{
		console.log(perguntas);
		res.render("index", {
			perguntas: perguntas
		});
	});
});

app.get("/Perguntar", (req, res) =>{
	res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) =>{
	var titulo = req.body.titulo;
	var descricao = req.body.descricao;

	pergunta.create({
		titulo: titulo,
		descricao: descricao
	}).then(()=>{
		res.redirect("/");
	});
});

app.get("/pergunta/:id", (req,res) =>{
	var id = req.params.id;
	pergunta.findOne({
		where: {id: id}
	}).then(pergunta =>{
		if (pergunta != undefined) {
			resposta.findAll({
				where: {perguntaid: pergunta.id},
				order:[
				['id', 'DESC']
				]
			}).then(respostas => {
				res.render("pergunta", {
				pergunta: pergunta,
				respostas: respostas
			});
		});
			
		}else{
			res.redirect("/");
		}
	});
});

app.post("/responder", (req,res) =>{
	var corpo = req.body.corpo;
	var perguntaid = req.body.pergunta;

	resposta.create({
		corpo: corpo,
		perguntaid: perguntaid
	}).then(()=>{
		res.redirect("/pergunta/" + perguntaid);
	});
});

//inicia a aplicação no servidor
app.listen(8080, () => {
	console.log("App rodando...");
});

