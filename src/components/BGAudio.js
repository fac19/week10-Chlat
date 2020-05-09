import React from "react";

const BGAudio = ({ src }) => {
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;
    console.log(audio);
    audio.loop = true;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [src]);

  return (
    <audio ref={audioRef}>
      <source src={src}></source>
    </audio>
  );
};
export default BGAudio;
