const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint para salvar avaliações
app.post('/salvarAvaliacao', (req, res) => {
    const { tecnicoId, nota, comentario } = req.body;

    if (!tecnicoId || !nota) {
        return res.status(400).send({ message: 'Dados inválidos' });
    }

    // Salvar avaliação no arquivo (ou banco de dados)
    const avaliacao = { tecnicoId, nota, comentario };
    fs.appendFile('avaliacoes.json', JSON.stringify(avaliacao) + '\n', (err) => {
        if (err) {
            console.error('Erro ao salvar avaliação', err);
            res.status(500).send({ message: 'Erro ao salvar avaliação' });
            return;
        }
        res.status(200).send({ message: 'Avaliação salva com sucesso' });
    });
});

// Endpoint para gerar relatório
app.get('/relatorio', (req, res) => {
    fs.readFile('avaliacoes.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao gerar relatório' });
            return;
        }
        const avaliacoes = data.split('\n').filter(line => line).map(line => JSON.parse(line));
        res.status(200).json(avaliacoes);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
