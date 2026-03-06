const express = require('express')
const fs = require('fs')
app = express()
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

let pessoas = []
const arquivo = fs.readFileSync('dados/pessoas.json', 'utf8')
pessoas = JSON.parse(arquivo)

app.get('/', (req, res) => {
    res.render('pagina', {pessoas})
})

app.post('/ola', (req, res) => {
    let pessoa = {}
    pessoa.nome = req.body.nomezim
    if (typeof pessoa.nome === 'undefined' || pessoa.nome === '') {
        pessoa.nome = 'mundo';
    }
    pessoa.idade = parseInt(req.body.idade) || 0
    console.log(`Mensagem recebida de ${pessoa.nome}!`)
    pessoas.push(pessoa)
    fs.writeFileSync('dados/pessoas.json', JSON.stringify(pessoas))
    res.render('pagina', {fala: `Olá, ${pessoa.nome}!`, pessoas})
})
app.get('/deletar', (req, res) => {

    let id = parseInt(req.query.id)

    if (!isNaN(id) && id >= 0 && id < pessoas.length) {
        pessoas.splice(id, 1)
    }

    fs.writeFileSync('dados/pessoas.json', JSON.stringify(pessoas))

    res.render('pagina', { pessoas })
})

app.get('/lista', (req, res) => {
    res.render('lista-nomes', {lista: pessoas})
})

const PORT = 3000
app.listen(PORT, console.log(`Servidor rodando em http://localhost:${PORT}`))