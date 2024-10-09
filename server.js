const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor! Use o endpoint /save-numbers para salvar números.');
});

// Endpoint para salvar os números pedidos
app.post('/save-numbers', (req, res) => {
    const data = req.body;

    // Leia o arquivo JSON (ou crie um novo se não existir)
    let fileData = [];
    if (fs.existsSync('grantedNumbers.json')) {
        fileData = JSON.parse(fs.readFileSync('grantedNumbers.json', 'utf-8'));
    }

    // Adiciona o novo registro ao array
    fileData.push(data);

    // Escreve o arquivo atualizado
    fs.writeFileSync('grantedNumbers.json', JSON.stringify(fileData, null, 2));

    res.status(200).send({ message: 'Números salvos com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
