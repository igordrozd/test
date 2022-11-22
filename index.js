const express = require('express');
const { Task } = require('./schemes');
const { User } = require('./schemes');
const { salt } = require('./schemes');
const {Document } =require('./schemes');
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
            documentId: req.params.documentId
            
        }
    });
    res.send(record);
});


app.get('/docm/', async (req, res) => {
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


app.get('/icon/', async (req, res) => {
    const result = await Icon.create(req.body);
    res.send('Запись создана');
});



app.get('/users/avt', async(req,res) => {

    const record = await User.findOne({
        where: {name: req.body.name}
    });
    
    if (record===null){
        req.body.password=bcrypt.hashSync(req.body.password, salt);
        const result = await User.create(req.body);
        console.log(result);
        res.send('Запись создана');
    }
    else{
        res.send('Имя уже существует');
    }
});
app.get('/users/vhod', async(req,res)=>{
    const record = await User.findOne({
        where: {
            name: req.body.name
    }});
    
    const a=bcrypt.hashSync(req.body.password, salt);
    if (record!== null){
        if (record.password !==a){
            console.log(a)
            console.log(record.password)
            res.status(403).send('Erorr 403 (wrong password)');
        }
        else{
            res.send('you avt')
        }
    }
    else{
        res.status(403).send('Erorr 403 (wrong name)');
    }
});


app.listen(8000, () => {
    console.log("Server started...");
});