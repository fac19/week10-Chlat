const playAudio = () => {
  const audio = document.querySelector("audio");
  audio.volume = 0.4;
  audio.loop = true;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
};

export default playAudio;
