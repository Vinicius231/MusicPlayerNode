var nameMusic = document.querySelector(".nameMusic");
var artista = document.querySelector(".artista");
var barra = document.querySelector(".barra");
var duracao = document.querySelector(".duracao");
var tempo = document.querySelector(".tempo");

const url = "http://localhost:3000/api";
var opcao = 0;
var musica = 0;
var audio;
var data;

async function getAllMusic() {
  const response = await fetch(url);

  data = await response.json();

  audio = new Audio(`../music/${data[musica].Arquivo}`);
  update();
}
const play = () => {
  if (opcao == 0) {
    audio.play();
    opcao++;
  } else if (opcao == 1) {
    audio.pause();
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
  update();
};

const update = () => {
  nameMusic.innerHTML = data[musica].music;
  artista.innerHTML = data[musica].Artista;
};

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

setInterval(time, 500);
getAllMusic();
