const express = require('express');
const { Task } = require('./schemes');

const app = express();

app.use( express.json() );

app.post('/tasks', async (req, res) => {
    const result = await Task.create(req.body);
    res.send(result);
});

app.listen(3000, () => {
    console.log("Server started...");
});