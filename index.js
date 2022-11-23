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

app.use( express.static('./client/build') );

app.use( express.json() );


app.post('/api/users/', async(req,res) => {

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

  
app.get('/api/users/', async(req,res)=>{
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
//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
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
//==============================================================================================================================================
app.post('/api/tasks', async (req, res) => {
    
    const result = await Task.create(req.body);
    res.send(result);
});
app.post('/api/docm/', async (req, res) => {
    const result = await Document.create(req.body);
    res.send(result);
});

app.post('/api/icon/', async (req, res) => {
    const result = await Icon.create(req.body);
    res.send(result);
});
//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.get('/api/tasks/:id', async (req, res) => {
    const record = await Task.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(record);
});


app.get('/api/tasks/', async (req, res) => {
    const record = await Task.findAll();
    res.send(record);
});
//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================


app.delete('/api/tasks/:id', async (req, res) => {
    const result = await Task.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/api/users/:id', async (req, res) => {
    const result = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/api/docm/:id', async (req, res) => {
    const result = await Document.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.delete('/api/icon/:id', async (req, res) => {
    const result = await Icon.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Запись удалена');
});


app.listen(8000, () => {
    console.log("Server started...");
});