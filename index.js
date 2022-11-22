const express = require('express');
const { Task } = require('./schemes');
const { User } = require('./schemes');
const { salt } = require('./schemes');
const {Document } =require('./schemes');
const {Icon } =require('./schemes');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const secret = 'shhhhh';

const app = express();


app.use( express.json() );


app.post('/users/', async(req,res) => {

    const record = await User.findOne({
        where: {name: req.body.name}
    });
    
    if (record===null){
        req.body.password=bcrypt.hashSync(req.body.password, salt);
        const result = await User.create(req.body);
        console.log(result);
        
        
        const token = jwt.sign({name : result.name, password : result.password}, secret);
        res.send({ token });
    }
    else{
        res.send('Имя уже существует');
    }
});


app.get('/users/', async(req,res)=>{
    const record = await User.findOne({
        where: {
            name: req.body.name
    }});
    
    const a = bcrypt.hashSync(req.body.password, salt);
    if (record!== null){
        if (record.password !==a){
            console.log(a)
            console.log(record.password)
            res.status(403).send('Erorr 403 (wrong password)');
        }
        else {
            const token = jwt.sign({name : record.name, password : record.password}, secret);
            res.send({ token });
        }
    }
    else{
        res.status(403).send('Erorr 403 (wrong name)');
    }
});
app.use((req, res, next) => {
    const token = req.headers.token;
    try {
        jwt.verify(token, secret);
        next();
    } catch {
        res
            .status(403)
            .send({
                message: 'Не авторизован'
            });
    }
});

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
    const record = await Task.findAll();
    res.send(record);
});


app.post('/docm/', async (req, res) => {
    const result = await Document.create(req.body);
    res.send('Запись создана');
});


app.delete('/tasks/:id', async (req, res) => {
    const result = await Task.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/users/:id', async (req, res) => {
    const result = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/docm/:id', async (req, res) => {
    const result = await Document.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/icon/:id', async (req, res) => {
    const result = await Icon.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.post('/icon/', async (req, res) => {
    const result = await Icon.create(req.body);
    res.send('Запись создана');
});





app.listen(3000, () => {
    console.log("Server started...");
});