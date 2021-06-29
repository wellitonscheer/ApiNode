const express = require('express');
const axios = require('axios')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3002;

let cepGlobal = "98910-000";

let users = [
    { nome: 'claudio', idade: '24' },
    { sobre: 'welliton', anos: '15' },
    { nome: 'dilce', idade: '46' },
    { nome: 'caie', idade: '15' }
]
app.post('/cep', (req, res) => {
    // let ceps = cep.filter(function(el) { return el.cep != "98910-000"; });
    cepGlobal = req.body.cepo;
    // cep = cep.push(user);
    res.send({
        cep: cepGlobal,
    });
    // cep.push(user);
    // res.send(users);
    // res.send(URL_1.search);
});
app.get('/cep', async (req, res) => {
    // const user = (req.body);
    // users.push(user);
    // res.status(201).send('usuario criado');
    const resp = await axios
        .get(`https://viacep.com.br/ws/${cepGlobal}/json/`);
        let cidade = resp.data;
        lugar = (cidade.localidade);
    res.send(lugar);
});

app.get('/users/:nome', (req, res) => {
    const { nome } = req.params;
    const user = users.find((user) => user.nome === nome);
    let userStr =  JSON.stringify(user);
    if (user) {
        res.status(200).send(user);
        return(userStr)
    }
    else {
        res.status(404).send('Not Found');
    }
});

app.listen(port, () => {
    console.log(`esta rodando na porta http://localhost:${port}`);
});