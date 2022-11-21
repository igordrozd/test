const express = require('express');
const { Task } = require('./schemes');
const { User } = require('./schemes');
var bcrypt = require('bcryptjs');
const app = express();

app.use( express.json() );

app.post('/tasks', async (req, res) => {
    const result = await Task.create(req.body);
    res.send('Запись создана');
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
app.get('/users/', async(req,res) => {
    var salt = bcrypt.genSaltSync(10);
    req.body.password=bcrypt.hashSync(req.body.password, salt);
    const result = await User.create(req.body);
    res.send('Запись создана');
});

app.listen(8000, () => {
    console.log("Server started...");
});
