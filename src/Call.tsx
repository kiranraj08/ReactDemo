import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "./hooks/useAgora";
import MediaPlayer from "./components/MediaPlayer";
import "./Call.css";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function Call() {
  const [appid, setAppid] = useState("");
  const [token, setToken] = useState("");
  const [channel, setChannel] = useState("");
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(canvasRef);
  const ctx = canvasRef.current?.getContext("2d");

  function drawImage() {
    ctx?.fillText("Welcome to agora", 900, 900);
    console.log("image function");
  }

  const getVideoTags = () => {
    console.log(document.getElementsByClassName("agora_video_player"));
  };

  useEffect(() => {
    join(
      "424415c2a3404c2a8d69a12afde542e6",
      "test",
      "006424415c2a3404c2a8d69a12afde542e6IADqn7rR2+2VyTxjVflHuLcgIOWaJDR5c4DUCUlVihlgEAx+f9gAAAAAEAAFUAr/dA/DYgEAAQB0D8Ni"
    );
    getVideoTags();
    drawImage();
  }, []);

  return (
    <>
      <div className="call">
        <form className="call-form">
          <label>
            AppID:
            <input
              type="text"
              name="appid"
              onChange={(event) => {
                setAppid(event.target.value);
              }}
            />
          </label>
          <label>
            Token(Optional):
            <input
              type="text"
              name="token"
              onChange={(event) => {
                setToken(event.target.value);
              }}
            />
          </label>
          <label>
            Channel:
            <input
              type="text"
              name="channel"
              onChange={(event) => {
                setChannel(event.target.value);
              }}
            />
          </label>
          <div className="button-group">
            <button
              id="join"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={joinState}
              onClick={() => {
                join(appid, channel, token);
              }}
            >
              Join
            </button>
            <button
              id="leave"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={() => {
                leave();
              }}
            >
              Leave
            </button>
          </div>
        </form>
        <div className="player-container">
          <div className="local-player-wrapper">
            <p className="local-player-text">
              {localVideoTrack && `localTrack`}
              {joinState && localVideoTrack ? `(${client.uid})` : ""}
            </p>
            <MediaPlayer
              videoTrack={localVideoTrack}
              audioTrack={undefined}
            ></MediaPlayer>
          </div>
          {remoteUsers.map((user) => (
            <div className="remote-player-wrapper" key={user.uid}>
              <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
              <MediaPlayer
                videoTrack={user.videoTrack}
                audioTrack={user.audioTrack}
              ></MediaPlayer>
            </div>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default Call;
