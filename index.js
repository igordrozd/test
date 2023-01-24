const cors = require('cors');
const open = require('open');
const express = require('express');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    Task, User, Document, Icon 
} = require('./schemes');

const PORT = 9089;

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

app.get(`/documents`,(req, res) => {
    res.sendFile(`./client/build/index.html`, { root: __dirname });
});
app.get(`/documents/:id`,(req, res) => {
    res.sendFile(`./client/build/index.html`, { root: __dirname });
});
app.get(`/register`,(req, res) => {
    res.sendFile(`./client/build/index.html`, { root: __dirname });
});
app.get(`/login`,(req, res) => {
    res.sendFile(`./client/build/index.html`, { root: __dirname });
});

app.post('/api/users/register', async(req,res) => {
    const { name, password, fullName } = req.body;
    const record = await User.findOne({
        where: { name }
    });
    
    if (record === null){
        const passwordHash = bcrypt.hashSync(password, privateKey);
        const result = await User.create({
            name,
            fullName,
            password: passwordHash,
        });
        const token = jwt.sign({
            id : result.id,
            name : result.name,
            fullName: result.fullName,
            password : result.password,
        }, privateKey);
        res.send({ token });
    }
    else {
        res
            .status(403)
            .send({
                message: 'Имя пользователя занято'
            });
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
                .status(403)
                .send({
                    message: 'Некорректный пароль'
                });
        }
        else {
            const token = jwt.sign({
                name : record.name,
                password : record.password ,
                id : record.id
            }, privateKey);
            res.send({ token });
        }
    }
    else{
        res
            .status(403)
            .send({
                message: 'Некорректное имя пользователя'
            });
    }
});


app.post('/api/users/verify', async (req, res) => {
    try {
        const token = req.headers.token;
        const user = jwt.verify(token, privateKey);
        const result = await User.findOne({
            where: {
                id: user.id,
                name: user.name,
                password: user.password
            }
        });
        if(result !== null){
            return res
                .send({
                    id: result.id,
                    name: result.name,
                    fullName: result.fullName
                })
        }
        res
            .send({ message: "access denied" })
    } catch(e) {
        res.status(500).send({
            message: e.message
        });
    }
});

//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.use((req, res, next) => {
    const token = req.headers.token;
    if(!req.path.includes(`/api`)) {
        return;
    }
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
    try{
        const token = req.headers.token 
        const user = jwt.verify(token, privateKey); 
        const { depth, title, type, start, end, documentId, fullName,color  } = req.body;

        const result = await Task.create({ 
            color,
            type,
            depth,
            title,
            end,
            start,
            userId: user.id,
            documentId,
            fullName
        }); 
        const record = await Document.findOne({
            where: {
                id: result.documentId
            }
        });
        const change = {changer: user.fullName};
        Object
            .keys(change)
            .forEach(key => {
                record[key] = user.fullName;
            })
        await record.save();
        res.send(result); 
    }catch(e){
        res
        .status(500)
        .send({
            message: e.message
        });
    }
    
});


app.post('/api/documents/', async (req, res) => {
    try{
    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 
    const result = await Document.create({ 
        ...req.body, 
        creator: user.fullName,
        changer: user.fullName,
        userId: user.id 
    }); 
    res.send(result);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.post('/api/icons/', async (req, res) => {
    try{
    const result = await Icon.create(req.body);
    res.send(result);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
    
});

//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.get('/api/tasks/:id', async (req, res) => {
    try{
    const record = await Task.findAll({
        where: {
            id: req.params.id
        }
    });
    res.send(record);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.get('/api/documents/:id/tasks', async (req, res) => {
    try{
        const records = await Task.findAll({
            where:{
                documentId : req.params.id
            }
        });
        res.send(records);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.get('/api/documents/', async (req, res) => {
    const token = req.headers.token;
    const user = jwt.verify(token, privateKey);
    const Op = require('Sequelize').Op;
    try {
        if(user.name === "admin"){
        const records = await Document.findAll({
            where:{

            }
        });
        res.send(records);
    } else {
        const records = await Document.findAll({
            where:{
                [Op.or]: [
                    {
                        "type": 2
                    },
                    {
                        "userId": user.id
                    }
                ]
            }
        });
        res.send(records);
    }
        
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.get('/api/documents/:id', async (req, res) => {
    try{
    const record = await Document.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(record);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


// app.get('/api/documents/:id', async (req, res) => {
//     try {
//         const records = await Document.findOne({
//             where: {
//                 id: parseInt(req.params.id, 10)
//             }
//         });
//         res.send(records);
//     }catch(e){
//         res
//             .status(500)
//             .send({
//                 message: e.message
//             });
//     }
// });


app.put('/api/tasks/:id', async (req, res) => {
    const token = req.headers.token 
    const user = jwt.verify(token, privateKey); 
    try {
        const record = await Task.findOne({
            where: {
                id: parseInt(req.params.id, 10)
            }
        });
        Object
            .keys(req.body)
            .forEach(key => {
                record[key] = req.body[key];
            })
        await record.save();
        
        const recordDoc = await Document.findOne({
            where: {
                id: record.documentId
            }
        });
        const change = {changer: user.fullName};
        Object
            .keys(change)
            .forEach(key => {
                recordDoc[key] = user.fullName;
            })
        await recordDoc.save();


        res.send(record);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.put('/api/documents/:id', async (req, res) => {
    try {
        const record = await Document.findOne({
            where: {
                id: req.params.id
            }
        });
        Object
            .keys(req.body)
            .forEach(key => {
                record[key] = req.body[key];
            })
        await record.save();
        res.send(record);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.put('/api/users/:id', async (req, res) => {
    try {
        const record = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        Object
            .keys(req.body)
            .forEach(key => {
                record[key] = req.body[key];
            })
        await record.save();
        res.send(record);
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});

//=============================================================================================================================================
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//=============================================================================================================================================
app.delete('/api/tasks/:id', async (req, res) => {
    try{
    const token = req.headers.token
    const user = jwt.verify(token, privateKey);
    const record = await Task.findOne({
        where: {
            id: req.params.id
        }
    });
    const result = await Task.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result===0){
        return res
            .status(404)
            .send({
                message: 'Element not found'
            })
    }

    const recordDoc = await Document.findOne({
        where: {
            id: record.documentId
        }
    });
    const change = { changer: user.fullName };
    Object
    .keys(change)
    .forEach(key => {
        recordDoc[key] = user.fullName;
    })
    await recordDoc.save();
    
    res.send({count: result});
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.delete('/api/users/:id', async (req, res) => {
    try {
        const result = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (result===0){
            res
                .status(404)
                .send({
                    message: 'Element not found'
                })
        }
        res.send({count: result});
    } catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.delete('/api/documents/:id', async (req, res) => {
    try{
        const tr = await Task.destroy({
        where:{
            documentId: req.params.id
        }
    });
        const result = await Document.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result===0){
        res
            .status(404)
            .send({
                message: "Element not found"
            })
    }
    res.send({count: result});
    }catch(e){
        res
            .status(500)
            .send({
                message: e.message
            });
    }
});


app.delete('/api/icons/:id', async(req, res) => {
    try {
        const result = await Icon.destroy({
            where: {
                id: req.params.id
            }
        });
        if (result === 0) {
            res
            .status(404)
            .send({
                message: "Element not found"
            })
        }
        res.send({ count: result });
    } catch (e) {
        res
        .status(500)
        .send({
            message: e.message
        });
    }
});


app.listen(PORT, async() => {
    const result = await User.findOne({
        where: {
            name: "admin"
        }
    });
    if (result === null) {
        const passwordHash = bcrypt.hashSync("admin", privateKey);
        const result = await User.create({
            name: "admin",
            fullName: "admin",
            password: passwordHash
        });
        const token = jwt.sign({
            id: result.id,
            name: result.name,
            fullName: result.fullName,
            password: result.password,
        }, privateKey);
    }
    console.log(`Server started on port ${PORT}...`);
    await open(`http://localhost:${PORT}`);
});