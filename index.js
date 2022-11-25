const cors = require('cors');
const express = require('express');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
    Task, User, Document, Icon 
} = require('./schemes');

const privateKey = `$2a$10$sbsCkzAn5.tMTX.pY3cK2O`;

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }

app.use( express.static('./client/build') );

app.use(cors(corsOptions));

app.use( express.json() );


app.post('/api/users/register', async(req,res) => {

    const record = await User.findOne({
        where: {name: req.body.name}
    });
    
    console.log(record)
    if (record===null){
        req.body.password=bcrypt.hashSync(req.body.password, privateKey);
        const result = await User.create(req.body);
        const token = jwt.sign({name : result.name, password : result.password,id : result.id}, privateKey);
        res.send({ token });
    }
    else{
        res.status(101).send('Имя уже существует');
    }
});

  
app.post('/api/users/login', async(req,res)=>{
    const record = await User.findOne({
        where: {
            name: req.body.name
    }});
    
    const a = bcrypt.hashSync(req.body.password, privateKey);
    if (record!== null){    
        if (record.password !==a){
            res
                .status(102)
                .send({
                    message: ' Wrong password'
            });
        }
        else {
            const token = jwt.sign({name : record.name, password : record.password ,id : record.id}, privateKey);
            res.send({ token });
        }
    }
    else{
        res
            .status(103)
            .send({
                message: ' Wrong name'
            });
    }
        
    
});
//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.use((req, res, next) => {
    const token = req.headers.token;
    try {
        jwt.verify(token, privateKey);
        next();
    } catch {
        res
            .status(401)
            .send({
                message: 'Не авторизован'
            });
    }
});
//==============================================================================================================================================
app.post('/api/tasks', async (req, res) => { 
    
    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 
    
    const result = await Task.create({ 
        ...req.body, 
        userId: user.id 
    }); 
     
 
    res.send(result); 
});
app.post('/api/documents/', async (req, res) => {

    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 
    
    const result = await Document.create({ 
        ...req.body, 
        userId: user.id 
    }); 
    res.send(result);

});

app.post('/api/icons/', async (req, res) => {
    const result = await Icon.create(req.body);
    res.send(result);
});
//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.get('/api/users/verify', async (req, res) => {
    const token = req.headers.token;
    const user = jwt.verify(token, privateKey);
    
    console.log(user.id);
    
    const result = await User.findAll({
        where: {
            id: user.id,
            name: user.name,
            password: user.password
        }
    });
    if(result != null){
        res.send({ message: "Авторизован" })
    } else{
        res.send({ message: "not access" })
    }
});


app.get('/api/tasks/:id', async (req, res) => {
    const record = await Task.findAll({
        where: {
            id: req.params.id
        }
    });
    res.send(record);
});


app.get('/api/documents/:id/tasks', async (req, res) => {
    const record = await Task.findAll({
        where:{
            documentId : req.params.id
        }
    });
    res.send(record);
});
app.get('/api/tasks/:type', async (req, res) => {
    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 

    const records = await Task.findAll({
        where:{
            TypeTask: req.params.type
        }
    });
    res.send(records);
});
app.get('/api/documents/', async (req, res) => {
    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 
    
    const records = await Document.findAll({
        where:{
            userId: user.id
        }
    });
    res.send(records);
});
app.get('/api/documents/:id', async (req, res) => {
    const record = await Document.findOne({
        where: {
            id: req.params.id
        }
    });
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
    if (result===0){
        res.status(403).send("такого элемента нет")
    }
    
    res.send({count: result});
});


app.delete('/api/users/:id', async (req, res) => {

    const result = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result===0){
        res.status(403).send("такого элемента нет")
    }
    res.send({count: result});
});


app.delete('/api/documents/:id', async (req, res) => {
    const result = await Document.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result===0){
        res.status(403).send("такого элемента нет")
    }
    res.send({count: result});
});


app.delete('/api/icons/:id', async (req, res) => {
    const result = await Icon.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result===0){
        res.status(403).send("такого элемента нет")
    }
    res.send({count: result});
});


app.listen(9000, () => {
    console.log("Server started...");
});


/* { message: "authorized" } или { message: "not access" }*/