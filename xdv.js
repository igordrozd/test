app.post('/users/', async(req,res) => { 
 
    const record = await User.findOne({ 
        where: {name: req.body.name} 
    }); 
     
    if (record===null){ 
        req.body.password=bcrypt.hashSync(req.body.password, salt); 
        const result = await User.create(req.body); 
        console.log(result); 
         
         
        const token = jwt.sign({name : result.name, password : result.password, id : result.id }, secret); 
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
            const token = jwt.sign({name : record.name, password : record.password, id : record.id}, secret); 
            res.send({ token }); 
        } 
    } 
    else{ 
        res.status(403).send('Erorr 403 (wrong name)'); 
    } 
});