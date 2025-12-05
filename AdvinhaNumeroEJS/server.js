const port = 8080;

const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let num = 0

app.get("/", (request, response) => {
    response.render("index", {mensagem: null});
});

app.post("/geranumero", (req, res) => {
    num = Math.floor(Math.random() * 100) + 1;
    console.log(num)
    res.render("index", { mensagem: "novo número gerado" });
});

app.post("/chute", (req, res) => {
    chute = Number(req.body.chute);

    console.log(chute)
    let mensagem = "";
    if(chute > num){
        mensagem = `O número é menor que ${chute}`
    }
    else if(chute < num){
        mensagem = `O número é maior que ${chute}`
    }
    else {
        mensagem = `O número é EXATAMENTE ${chute}, PARABÉNS!!!`
    }
    console.log(mensagem)
    res.render("index", { mensagem });
});

app.use((request, response, next) => {
    response.status(404).send("<h1>Página não encontrada.</h1>");
});

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
});