var nameMusic = document.querySelector(".nameMusic");
var artista = document.querySelector(".artista");
var barra = document.querySelector(".barra");
var duracao = document.querySelector(".duracao");
var tempo = document.querySelector(".tempo");
var audio = document.querySelector('.audio')
var imgPlay = document.querySelector('.imgPlay')

const url = "https://music-player-node.vercel.app/api";
var opcao = 0;
var musica = 0;
var audio;
var data;
var interval

async function getAllMusic() {
  const response = await fetch(url);

  data = await response.json();

  audio = new Audio(`../music/${data[musica].Arquivo}`);
  update();

  startInterval()
}
const play = () => {
  if (opcao == 0) {
    audio.play();
    imgPlay.src = '../imgs/pause.png'
    opcao++;
  } else if (opcao == 1) {
    audio.pause();
    imgPlay.src = '../imgs/continuar.png'
    opcao--;
  }
  update();
};

const next = () => {
  audio.pause();
  musica++;
  if (musica >= data.length) {
    musica = 0;
  }
  audio = new Audio(`../music/${data[musica].Arquivo}`);
  audio.play();
  imgPlay.src = '../imgs/pause.png'
  update();
};

const before = () => {
  audio.pause();
  musica--;
  if (musica < 0) {
    musica = data.length - 1;
  }
  audio = new Audio(`../music/${data[musica].Arquivo}`);
  audio.play();
  imgPlay.src = '../imgs/pause.png'
  update();
};

const update = () => {
  nameMusic.innerHTML = data[musica].music;
  artista.innerHTML = data[musica].Artista;
};

barra.addEventListener('touchmove',()=> {
  barraClick()
})
barra.addEventListener('touchstart',()=>{
  barraClick()
})

const barraClick = ()=> {
    var barraValue = barra.value
    audio.currentTime = barraValue
}
const time = () => {
  let timeBarra = audio.currentTime

  let timeMinuto = Math.floor(timeBarra / 60);
  let timeSegundo = Math.floor(timeBarra % 60);

  let duration = audio.duration;

  let minuto = Math.floor(duration / 60);
  let segundo = Math.floor(duration % 60);

  if (timeMinuto < 10) {
    timeMinuto = "0" + timeMinuto;
  }
  if (timeSegundo < 10) {
    timeSegundo = "0" + timeSegundo;
  }

  tempo.innerHTML = `${timeMinuto}:${timeSegundo}`;
  duracao.innerHTML = `${minuto}:${segundo}`;

  barra.value = timeBarra;
  barra.max = duration;

  if(timeBarra >= duration) {
    next()
  }
};

const startInterval = () => {
    interval = setInterval(time, 500);
}
getAllMusic();
