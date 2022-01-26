const express = require('express');
const {schedule} = require('node-cron');
const path = require('path');
const takeInfo = require('./modules/take_data');

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();

//Agendando o horário
schedule("0  45  07 * * *",()=>{
    //Função pra rodar o shell_script
    takeInfo();
})

app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'/public'));
app.engine('html',require('ejs').renderFile);

app.get('/',(req,res)=>{
    res.status(200).render('index.html')
})


app.listen(port,host,()=>console.log(`API rodando na porta ${port}`))


