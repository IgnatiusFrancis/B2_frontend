import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ currentTrack }) => {
  return (
    <>
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack currentTrack {...currentTrack} />
          <Controls />
          <ProgressBar />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
