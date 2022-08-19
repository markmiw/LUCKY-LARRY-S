import React, { useState } from 'react';
import Sound from 'react-sound';
import { FaPlay } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';

export default function PlayBGM(
  handleSongLoading,
  handleSongPlaying,
  handleSongFinishedPlaying,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <button
        type="submit"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <FaPlay /> : <GiPauseButton />}
      </button>
      <Sound
        url="https://www.youtube.com/watch?v=GKtlRchHpx8&ab_channel=EscapeOne"
        playStatus={Sound.status.PLAYING}
        playFromStatus={300}
        onLoading={handleSongPlaying}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinishedPlaying} />
    </div>
  );
};