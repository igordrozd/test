const express = require('express');
const { Task } = require('./schemes');

const app = express();

app.use( express.json() );

app.post('/tasks', async (req, res) => {
    const result = await Task.create(req.body);
    res.send('Запись создана');
});

app.get('/users', async (req, res) => {
    
});

app.get('/tasks/:id', async (req, res) => {
    const record = await Task.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(record);
});

app.get('/tasks/', async (req, res) => {
    const record = await Task.findAll({
        where: {
        }
    });
    res.send(record);
});

app.delete('/tasks/:id', async (req, res) => {
    const result = await Task.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});

app.listen(8000, () => {
    console.log("Server started...");
});
