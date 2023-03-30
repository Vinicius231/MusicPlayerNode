const express = require('express')
const path = require('path')
const app = express()
const music = require('./music.json')
const router = express.Router()

app.use(express.static('public'))

router.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname+'/public/page/index.html'))
})

router.get('/api',(req,res)=> {
    return res.json(music)
})

app.listen(process.env.PORT || 3000)

app.use(router)