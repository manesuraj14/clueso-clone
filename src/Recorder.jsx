import { useRef, useState } from "react";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [fileName, setFileName] = useState("recording");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      mediaRecorderRef.current = new MediaRecorder(combinedStream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setPaused(false);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert("Permission denied or recording failed.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    clearInterval(timerRef.current);
    setRecording(false);
    setPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorderRef.current.pause();
    clearInterval(timerRef.current);
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.resume();
    setPaused(false);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="recorder">
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <>
          <button onClick={stopRecording}>Stop</button>

          {!paused ? (
            <button onClick={pauseRecording}>Pause</button>
          ) : (
            <button onClick={resumeRecording}>Resume</button>
          )}
        </>
      )}

      {recording && <p>Recording Time: {formatTime(seconds)}</p>}

      {videoURL && (
        <div className="preview">
          <h3>Preview</h3>

          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />

          <br /><br />

          <video src={videoURL} controls />

          <br />

          <a href={videoURL} download={`${fileName}.webm`}>
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}
