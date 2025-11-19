const port = 8080;

// Express
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let votos = {
    vermelho: 0,
    azul: 0,
    verde: 0
};

app.get("/", (request, response) => {
    response.render("main");
});

app.post("/votar", (request, response) => {
    const voto = request.body.voto;
    
    if (votos.hasOwnProperty(voto)) {
        votos[voto]++;
    }
    response.redirect("/resultado");
});

app.get("/resultado", (request, response) => {
    const totalVotos = votos.vermelho + votos.azul + votos.verde;
    
    response.render("resultado", {
        votos: votos,
        totalVotos: totalVotos
    });
});

app.get("/reset", (request, response) => {
    votos = {
        vermelho: 0,
        azul: 0,
        verde: 0
    };
    response.redirect("/resultado");
});

app.use((request, response, next) => {
    response.status(404).send("<h1>Página não encontrada.</h1>");
});

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
});