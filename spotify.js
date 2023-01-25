// Creating songs' database

let song_info = {
  1: ["thumbnails/attention.png", "Attention", "Charlie Puth", "3:29"],
  2: [
    "thumbnails/beautifulmistakes.jpg",
    "Beautiful Mistakes",
    "Maroon 5",
    "3:47",
  ],
  3: ["thumbnails/dusktilldawn.jpg", "Dusk Till Dawn", "Zayn", "3:59"],
  4: ["thumbnails/friends.jpg", "Friends", "Anne Marie", "3:23"],
  5: ["thumbnails/ohmygod.jpg", "Oh My God", "Adele", "3:45"],
  6: ["thumbnails/onedance.png", "One Dance", "One dance", "2:53"],
  7: [
    "thumbnails/overpassgraffiti.jpg",
    "Overpass Graffiti",
    "Ed Sheeran",
    "3:57",
  ],
  8: ["thumbnails/peaches.jpg", "Peaches", "Justin Bieber", "3:18"],
  9: ["thumbnails/sugar.jpg", "Sugar", "Maroon 5", "3:54"],
  10: [
    "thumbnails/thinkingoutloud.jpg",
    "Thinking Out Loud",
    "Ed Sheran",
    "4:42",
  ],
  11: ["thumbnails/badhabits.jpg", "Bad Habits", "Ed Sheeran", "3:51"],
  12: ["thumbnails/bambam.jpg", "Bam Bam", "Camila Cabello", "3:26"],
  13: [
    "thumbnails/blindinglights.jpg",
    "Blinding Lights",
    "The Weeknd",
    "3:14",
  ],
  14: [
    "thumbnails/chainedtotherhythm.jpg",
    "Chained To The Rhythm",
    "Katy Perry",
    "3:58",
  ],
  15: ["thumbnails/levitating.jpg", "Levitating", "Dua Lipa", "3:24"],
  16: [
    "thumbnails/tobeyoung.jpg",
    "To Be Young",
    "Anne Marie, Doja Cat",
    "3:25",
  ],
};

let thumbnails = [];
let songNames = [];
let artists = [];
let songLengths = [];

for (i in song_info) {
  let thumbnail = song_info[i][0];
  thumbnails.push(thumbnail);

  let songName = song_info[i][1];
  songNames.push(songName);

  let artist = song_info[i][2];
  artists.push(artist);

  let songLength = song_info[i][3];
  songLengths.push(songLength);
}

// Adding songs in HTML document

let box = document.getElementById("right");
let upperindex = songNames.length;
for (let i = 0; i < upperindex; i++) {
  box.innerHTML += `
    <ul class="songs" id="${i + 1}">
        <li>
            <img src='${thumbnails[i]}' class='songart'>
        </li>
        <li>${songNames[i]}</li>
        <li>${artists[i]}</li>
        <li>${songLengths[i]}</li>
    </ul>
    `;
}

// Logic for playing songs

let previous = document.getElementById("previous");
let playback = document.getElementById("playback");
let next = document.getElementById("next");

let audioElement = new Audio("songs/1.mp3");
// Sample audioElement

let songs = document.getElementsByClassName("songs");
let songsArr = Array.from(songs);
// Array.from() returns an array from any object
// It is converted to array so that it can be iterated

let index = "";
songsArr.forEach((element) => {
  element.addEventListener("click", (x) => {
    index = parseInt(x.target.id);
    audioElement.src = `songs/${index}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    playback.src = "pause.png";
  });
});

// Making player buttons functioning

playback.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    playback.src = "pause.png";
  } else {
    audioElement.pause();
    playback.src = "play.png";
  }
});

previous.addEventListener("click", () => {
  if (index > 1) {
    index -= 1;
  } else {
    index = upperindex;
  }
  audioElement.currentTime = 0;
  audioElement.src = `songs/${index}.mp3`;
  audioElement.play();
  playback.src = "pause.png";
});

next.addEventListener("click", () => {
  if (index == upperindex) {
    index = 1;
  } else {
    index += 1;
  }
  audioElement.currentTime = 0;
  audioElement.src = `songs/${index}.mp3`;
  audioElement.play();
  playback.src = "pause.png";
});

// Linking seekbar with song

let progressBar = document.getElementById("progressBar");

audioElement.addEventListener("timeupdate", () => {
  progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;

  //   This logic is for -> what to do when song finishes
  if (audioElement.currentTime == audioElement.duration) {
    if (index == upperindex) {
      index = 1;
    } else {
      index += 1;
    }
    audioElement.currentTime = 0;
    audioElement.src = `songs/${index}.mp3`;
    audioElement.play();
    playback.src = "pause.png";
  }
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Touchups

let musicLibrary = document.getElementById("lib");
musicLibrary.addEventListener("click", () => {
  // Yes! IDs can be accessed without grabbing them in js
  if (right.style.visibility != "visible") {
    right.style.visibility = "visible";
  } else {
    right.style.visibility = "hidden";
  }
});

function profile() {
  let name = prompt("Enter your name", "Guest");
  document.getElementById("btn_Profile").innerHTML = name;
}
