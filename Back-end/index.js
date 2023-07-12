const express =require('express');
const bodyparser = require('body-parser');
const sendmail = require("./routes/sendmail")
const port = 3001;
const api = require('./routes/api')
const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyparser.json());

app.use('/api',api);


app.post("/sendemail",sendmail)



app.get('/',(req,res)=>{
    res.send("hello from server")
})

app.listen(port,()=>{
    console.log("server is running")
})