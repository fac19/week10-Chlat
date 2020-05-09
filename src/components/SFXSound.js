import React from "react";

const SFXSound = ({ src }) => {
  const soundRef = React.useRef(null);
  React.useEffect(() => {
    console.log("soundRef", soundRef);
    const sound = soundRef.current;
    console.log("soundRef.current", sound);
    sound.volume = 0.9;

    if (!sound) return;

    sound.play();
  });

  return (
    <audio ref={soundRef}>
      <source src={src}></source>
    </audio>
  );
};

export default SFXSound;
