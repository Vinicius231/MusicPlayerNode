const express = require('express')
const app = express()
const music = require('./music.json')

app.use(express.static('public'))

app.get('/',(req,res)=> {
    res.sendFile(__dirname+'/public/page/index.html')
})

app.get('/api',(req,res)=> {
    return res.json(music)
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('Funcionando')
})
