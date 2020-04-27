const express = require('express');
const bodyParser = require('body-parser')

const PORT = 3000
const app = express()
const api = require('./router/api')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api' , api)

app.get('/', function(req, res) {
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost: ' + PORT)
})