const express = require('express');
const app = express();
let trades = [];
app.get('/', (req,res)=>{
 res.send(`<html><body style="font-family:sans-serif;padding:20px;text-align:center">
 <h2>📱 FREE Trade Copier</h2><p style="color:green">LIVE ✅</p>
 <form action="/copy" style="border:1px solid #ccc;padding:15px;border-radius:10px">
 Symbol:<br><input name="symbol" value="EURUSD" style="padding:10px;width:90%"><br><br>
 Type:<br><select name="type" style="padding:10px;width:90%"><option>BUY</option><option>SELL</option></select><br><br>
 Lot:<br><input name="lot" value="0.10" style="padding:10px;width:90%"><br><br>
 <button style="padding:12px;width:95%;background:black;color:white;border:none;border-radius:5px;font-size:16px">COPY TRADE NOW</button>
 </form><br><a href="/trades">View All Trades</a></body></html>`);
});
app.get('/copy',(req,res)=>{
 const t={symbol:req.query.symbol||'EURUSD',type:req.query.type||'BUY',lot:req.query.lot||'0.10',time:new Date().toLocaleString()};
 trades.push(t);
 res.send(`<h2 style="text-align:center">✅ COPIED!</h2><p style="text-align:center">Now take same trade on 2nd MT5:<br><br><b style="font-size:20px">${t.type} ${t.symbol} ${t.lot}</b><br><br>${t.time}</p><div style="text-align:center"><a href="/">Copy Another</a> | <a href="/trades">View All</a></div>`);
});
app.get('/trades',(req,res)=>{
 res.send(`<h3>All Trades (${trades.length})</h3>`+trades.map(t=>`<p>${t.time} - ${t.type} ${t.symbol} ${t.lot}</p>`).join('')+`<br><a href="/">Back</a>`);
});
app.listen(process.env.PORT||10000,()=>console.log('Ready'));
