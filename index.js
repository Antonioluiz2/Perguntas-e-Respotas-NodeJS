const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//DataBase conexão
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com suceso!")
    })
    .catch((msgerro)=>{
        console.log(msgerro)
    })

//Estou dizendo para o Express use o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
//o findeAll listara todas as perguntas, order: irá ordenar por 'id' segundo o BD em ordem decrescente 'DESC'.
app.get("/",(req, res)=>{
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(pergunta => {
        res.render("home",{
        pergunta: pergunta
    })
})
});
/*app.get("/home",(req, res)=>{
    res.render("home")
});*/
app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
});
app.get("/index", (req,res)=>{
    res.render("index");
});
app.get("/salvar", (req, res)=>{
    res.send("salvar");
});
app.post("/perguntar",(req, res)=>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    //res.send("ESCREVER ALGO!" + titulo + descricao)

//listar as perguntas feitas
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    })
    .then(()=>{
        res.redirect("/");
    })
    .catch(()=>{
        res.send("não deu certo!")
    });
});

app.get("/pergunta/:id", (req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where:{id: id},
    }).then(pergunta=>{
        if(pergunta!=undefined){
            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[['id','DESC']]
            }).then(respostas =>{
                res.render("perguntas",{
                    pergunta: pergunta,
                    respostas:respostas,
                });
            })
            
        }else{
            res.redirect("/");
        }
    });
});
app.post("/responder",(req,res)=>{
    let corpo     = req.body.corpo
    let perguntaId= req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    }).catch(()=>{
        res.send("não deu certo!")
    });
});
app.listen(8081,()=>{console.log('App ativado!, Ola Mundo!!');});