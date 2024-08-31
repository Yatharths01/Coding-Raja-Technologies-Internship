const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Courtesy Call",
    name: "Thousand Foot Krutch",
    source: "song-list/Court-call.mp3",
  },
  {
    title: "Nede Nede",
    name: "Alisha Chinoy",
    source: "song-list/Nede.mp3",
  },
  {
    title: "Love me",
    name: "Jonny Koch, Annie Solange",
    source: "song-list/love-me.mp3",
  },
  {
    title: "One More Night",
    name: "Maroon 5",
    source: "song-list/omn.mp3",
  },
  {
    title: "RHTDM Mashup",
    name: "Parth Dodiya",
    source: "song-list/RHTDM.mp3",
  },

  {
    title: "Sunn Raha Hai Na",
    name: "Ankit Tiwari",
    source: "song-list/Sunn-raha.mp3",
  },
  {
    title: "Dil Sambhal Ja Zara",
    name: "Arijit Singh, Mohd Irfan",
    source: "song-list/Dil-sambhal.mp3",
  },
];

//! Updating song info

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", function () {
    //! Don't need to do anything here, the purpose is to ensure the event listener is added once
  });
}

//! Showing the current time and updating the progress bar more frequently

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

//! Duration and current time of the song for the progress bar

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

//! Function to pause the music and updating icons

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

//! Function to play the music and updating icons

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

//! Function to play or pause the music

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

//! Jumping to the desired time of the song by clicking the progress bar

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

//! When the song is still paused, if you click the progress bar, the song keeps playing

progress.addEventListener("change", function () {
  playSong();
});

//! Next song

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

//! Previous song

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  allowTouchMove: false,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

// Inspiration: https://dribbble.com/shots/5455156-Car-HMI-assistant-Album-switching
