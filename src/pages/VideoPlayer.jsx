import React, { useEffect, useRef } from 'react';
import './Styles.css';

const VideoPlayer = ({ stream, username = 'Peer' }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="video-container">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
      />
      <div className="video-label">{username}</div>
    </div>
  );
};

export default VideoPlayer;