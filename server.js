const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Lê os números concedidos do arquivo JSON
let grantedNumbers = [];
if (fs.existsSync('grantedNumbers.json')) {
    grantedNumbers = JSON.parse(fs.readFileSync('grantedNumbers.json', 'utf-8'));
}

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor! Use o endpoint /save-numbers para salvar números.');
});

// Endpoint para salvar os números pedidos
app.post('/save-numbers', (req, res) => {
    const data = req.body;

    // Adiciona o novo registro ao array
    grantedNumbers.push(data);

    // Escreve o arquivo atualizado
    fs.writeFileSync('grantedNumbers.json', JSON.stringify(grantedNumbers, null, 2));

    res.status(200).send({ message: 'Números salvos com sucesso!' });
});

// Novo endpoint para obter números concedidos
app.get('/get-numbers', (req, res) => {
    res.status(200).json(grantedNumbers);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
