const express = require('express');
const app = express();
let trades = [];

app.get('/', (req, res) => {
  res.send(`
  <html><body style="font-family:sans-serif;padding:20px">
  <h2>📱 FREE Trade Copier - Phone Only</h2>
  <p>Server: LIVE ✅</p>
  <form action="/copy">
    Symbol: <input name="symbol" value="EURUSD" style="padding:8px"><br><br>
    Type: <select name="type" style="padding:8px"><option>BUY</option><option>SELL</option></select><br><br>
    Lot: <input name="lot" value="0.10" style="padding:8px"><br><br>
    <button style="padding:12px 20px;background:black;color:white;border:none">COPY TRADE NOW</button>
  </form>
  <br><a href="/trades">View My Copied Trades</a>
  <p><small>How to use: Take trade on Master MT5 phone, then open this page and tap COPY with same details. Then take same trade on Slave MT5 phone.</small></p>
  </body></html>`);
});

app.get('/copy', (req, res) => {
  const t = { symbol: req.query.symbol||'EURUSD', type: req.query.type||'BUY', lot: req.query.lot||'0.10', time: new Date().toLocaleString() };
  trades.push(t);
  res.send(`<h2>✅ Trade Copied!</h2><p>${t.type} ${t.symbol} Lot ${t.lot}</p><p>Now open your 2nd MT5 account on phone and take same trade: <b>${t.type} ${t.symbol} ${t.lot}</b></p><a href="/">Copy Another</a> | <a href="/trades">View All</a>`);
});

app.get('/trades', (req, res) => {
  res.send(`<h3>All Copied Trades (${trades.length})</h3>` + trades.map(t=>`<p>${t.time} - ${t.type} ${t.symbol} ${t.lot}</p>`).join('') + `<br><a href="/">Back</a>`);
});

app.listen(process.env.PORT||3000, ()=>console.log('Phone Copier Ready'));
