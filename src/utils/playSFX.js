const playSound = (selectedSound) => {
  const sound = document.querySelector("#action-sound");
  if (!sound) return;
  sound.src = selectedSound;
  sound.play();
};

export default playSound;
