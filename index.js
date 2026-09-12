const express = require('express');
const app = express();
app.use(express.json());
app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin','*');res.header('Access-Control-Allow-Headers','*');res.header('Access-Control-Allow-Methods','*');next();});
app.get('/',(req,res)=>res.send('FREE Trade Copier Live $0 - Ready'));
app.post('/copy',(req,res)=>{console.log('Copying:',req.body);res.json({ok:true,ticket:Date.now(),msg:'FREE copy success'});});
app.listen(process.env.PORT||10000,()=>console.log('Free server ready'));
