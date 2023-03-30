var nameMusic = document.querySelector('.nameMusic')
var artista = document.querySelector('.artista')

const url = 'http://localhost:3000/api'
var opcao = 0
var musica = 0
var audio
var data

async function getAllMusic(){
    const response = await fetch(url)

    data = await response.json()

    audio = new Audio(`../music/${data[musica].Arquivo}`)
    nameMusic.innerHTML = data[musica].music
    artista.innerHTML = data[musica].Artista
}
const play = ()=> {
    nameMusic.innerHTML = data[musica].music
    artista.innerHTML = data[musica].Artista
    if(opcao == 0 )  {
        audio.play()
        opcao++
    } else if (opcao == 1) {
        audio.pause()
        opcao--
    }
}

const next = ()=> {
    audio.pause()
    musica++
    if(musica >= data.length) {
        musica = 0
    }
    nameMusic.innerHTML = data[musica].music
    artista.innerHTML = data[musica].Artista
    audio = new Audio(`../music/${data[musica].Arquivo}`)
    audio.play()
}

const before = ()=> {
    audio.pause()
    musica--
    if(musica < 0) {
        musica = data.length-1
    }
    nameMusic.innerHTML = data[musica].music
    artista.innerHTML = data[musica].Artista
    audio = new Audio(`../music/${data[musica].Arquivo}`)
    audio.play()
}

getAllMusic()