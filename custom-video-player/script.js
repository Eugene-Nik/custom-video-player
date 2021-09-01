// Самооценка
console.log(`Самооценка: 
1. [+10 баллов.] Разобрался в коде чужого проекта, понял его, воспроизвёл исходное приложение. (Правки и изменения допускаются и приветствуются, если они не ухудшают внешний вид и функционал исходного проекта). 
2. [+10 баллов] Полностью реализовал обязательный дополнительный функционал - Управление плеером с клавиатуры:
    + клавиша Пробел — пауза, 
    + Клавиша M (англ) — отключение/включение звука, 
    + Клавиша > — ускорение воспроизведения ролика, 
    + Клавиша < — замедление воспроизведения ролика, 
    + Клавиша F — включение/выключение полноэкранного режима.
3. [+20 баллов] Выполнил два дополнительных функционала на выбор: 
  3.1 [+10 баллов] Добавить поддержку других горячих клавиш из тех, которые поддерживаются в YouTube видео - 2 балла за каждую дополнительную горячую клавишу:
    [+2 балла] + Клавиша K — Приостановить или продолжить воспроизведение,
    [+2 балла] + Клавиша J — Перемотать ролик на 10 секунд назад,
    [+2 балла] + Клавиша B — Перемотать ролик на 10 секунд вперед,
    [+2 балла] + Клавиша P — Перейти к предыдущему видео,
    [+2 балла] + Клавиша N — Перейти к следующему видео.
  3.2 [+10 баллов] Добавить возможность перелистывания видео или слайдер видео 


Итого: 40/30 = 30 баллов.
`);




const player = document.querySelector(".player");
const movie = player.querySelector(".movie");
const playerBar = player.querySelector(".player-buttons");

const video = document.querySelectorAll(".movie");
const episodeName = document.querySelector(".episode-name")


const rewindBack = player.querySelector(".rewind-back");
const rewindForward = player.querySelector(".rewind-forward");
const rewindButtons = player.querySelectorAll("[data-skip]");

const play = player.querySelector(".play");
const volume = player.querySelector(".volume");
const fullScreen = player.querySelector(".full-screen");
const speed = player.querySelector(".speed");

const progressVideo = player.querySelector(".progress-video");
const progressVolume = player.querySelector(".progress-volume");
const progressPlayback = player.querySelector(".progress-playback");

const circle = player.querySelector(".progress-video::-webkit-slider-thumb");
const ranges = player.querySelectorAll(".slider");

const left = document.querySelector(".left");
const right = document.querySelector(".right");

const playSvg = '<img src="./assets/svg/player-play.svg" alt="play">';
const pauseSvg = '<img src="./assets/svg/player-pause.png" alt="pause">';
const volumeSvg = '<img src="./assets/svg/player-volume.svg" alt="volume">';
const muteSvg = '<img src="./assets/svg/player-mute.png" alt="mute">';

const videoOne = './assets/video/01.mp4'
const videoTwo = './assets/video/02.mp4'
const videoThree = './assets/video/03.mp4'

const posterOne = './assets/img/01.jpg'
const posterTwo = './assets/img/02.jpg'
const posterThree = './assets/img/03.jpg'


// play/pause button
function togglePlay() {
  if (movie.paused) {
    movie.play();
    play.innerHTML = pauseSvg;
  } else {
    movie.pause();
    play.innerHTML = playSvg;
  }
}
// volume/mute button
function toggleVolume() {
  if (movie.muted) {
    movie.muted = false;
    volume.innerHTML = volumeSvg;
    progressVolume.value = 1;
    progressVolume.style.background = `linear-gradient(to right, #24809e 0%, #24809e 100%, #c4c4c4 100%, #c4c4c4 100%)`;
  } else {
    movie.muted = true;
    volume.innerHTML = muteSvg;
    progressVolume.value = 0;
    progressVolume.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
  }
}
// full Screen button
function toggleFullScreen() {
  if (!movie.fullscreenElement) {
    movie.requestFullscreen()
  } else if (movie.fullscreenElement) {
      movie.exitFullscreen();
    }
}

function toggleSkip() {
  movie.currentTime += parseFloat(this.dataset.skip);
}

function progressBarUpdate() {
  movie[this.name] = this.value;
  this.name.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`;
}

function fixBlue() {
  movie[this.name] = this.value;
  progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`;
}


//

function scrub(e) {
  const scrubTime = (e.offsetX / progressVideo.offsetWidth) * movie.duration;
  movie.currentTime = scrubTime;
}

function progressVideoUpdate(){
  const percent = (movie.currentTime / movie.duration) * 100;
  progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`;
  progressVideo.value = percent;
}

function resetPlayback(){
  progressPlayback.value = 1;
  progressPlayback.style.background = `linear-gradient(to right, #24809e 0%, #24809e 50%, #c4c4c4 50%, #c4c4c4 100%)`;
}

function muteProgressVolume (){
  if(progressVolume.value > 0){
    movie.muted = false;
    volume.innerHTML = volumeSvg;
  } else{
    volume.innerHTML = muteSvg;
  }
}


document.onkeydown = function (event){
  console.log(event);
  if (event.code == "KeyF"){
    toggleFullScreen();
  } else if(event.code == "KeyM"){
    toggleVolume();
  } else if(event.code == "Space" || event.code == "KeyK"){
    togglePlay();
  } else if(event.code == "Comma" || event.code == "KeyJ"){
    movie.currentTime += parseFloat(rewindBack.dataset.skip)
  } else if(event.code == "Period" || event.code == "KeyB"){
    movie.currentTime += parseFloat(rewindForward.dataset.skip)
  } else if(event.code == "KeyP"){
    sliderLeft();
  } else if(event.code == "KeyN"){
    sliderRight();
  }

}

function sliderLeft(){
  if(video[0].attributes[0].textContent.indexOf('01.mp4') !== -1){
    video[0].attributes[0].textContent = videoThree;
    video[0].attributes[1].textContent = posterThree;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-паук: Возвращение домой ";
    play.innerHTML = playSvg;
  } else if (video[0].attributes[0].textContent.indexOf('02.mp4') !== -1){
    video[0].attributes[0].textContent = videoOne;
    video[0].attributes[1].textContent = posterOne;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-Паук: Нет пути домой";
    play.innerHTML = playSvg;
  } else if (video[0].attributes[0].textContent.indexOf('03.mp4') !== -1){
    video[0].attributes[0].textContent = videoTwo;
    video[0].attributes[1].textContent = posterTwo;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-Паук: Вдали от дома";
    play.innerHTML = playSvg;
  }

}

function sliderRight(){
  if(video[0].attributes[0].textContent.indexOf('01.mp4') !== -1){
    video[0].attributes[0].textContent = videoTwo;
    video[0].attributes[1].textContent = posterTwo;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-Паук: Вдали от дома";
    play.innerHTML = playSvg;
  } else if (video[0].attributes[0].textContent.indexOf('02.mp4') !== -1){
    video[0].attributes[0].textContent = videoThree;
    video[0].attributes[1].textContent = posterThree;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-паук: Возвращение домой ";
    play.innerHTML = playSvg;
  } else if (video[0].attributes[0].textContent.indexOf('03.mp4') !== -1){
    video[0].attributes[0].textContent = videoOne;
    video[0].attributes[1].textContent = posterOne;
    progressVideo.style.background = `linear-gradient(to right, #24809e 0%, #24809e 0%, #c4c4c4 0%, #c4c4c4 100%)`;
    episodeName.innerText = "Человек-Паук: Нет пути домой";
    play.innerHTML = playSvg;
  }
}

// progress bars video, volume and playback
progressVideo.addEventListener("input", function () {
  const value = this.value * 100;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});


progressVolume.addEventListener("input", function () {
  const value = this.value * 100;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

progressPlayback.addEventListener("input", function () {
  const value = this.value * 50;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

//
movie.addEventListener("click", togglePlay);
play.addEventListener("click", togglePlay);
volume.addEventListener("click", toggleVolume);
fullScreen.addEventListener("click", toggleFullScreen);
rewindButtons.forEach(button => button.addEventListener("click", toggleSkip));
movie.addEventListener('timeupdate', progressVideoUpdate);
ranges.forEach(range => range.addEventListener("change", progressBarUpdate));
ranges.forEach(range => range.addEventListener("mousemove", progressBarUpdate));
progressVideo.addEventListener("input", fixBlue);
speed.addEventListener("click", resetPlayback);
progressVolume.addEventListener("change", muteProgressVolume);
progressVolume.addEventListener("mousemove", muteProgressVolume);

left.addEventListener("click", sliderLeft);
right.addEventListener("click", sliderRight);


let mousedown = false;
progressVideo.addEventListener('click', scrub);
progressVideo.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressVideo.addEventListener('mousedown', () => mousedown = true);
progressVideo.addEventListener('mouseup', () => mousedown = false);
