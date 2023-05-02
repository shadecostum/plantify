import React, { useState,useRef } from 'react';
import Button from '@material-ui/core/Button';



const Camera = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      setError(null);
    }
  };

  const takePicture = () => {
    if (stream && canvasRef.current) {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      const img = document.createElement('img');
      img.src = dataUrl;
      document.body.appendChild(img);
    }
  };

  return (
    <div>
      {stream ? (
        
        <div>
          <video autoPlay={true} ref={(video) => { video.srcObject = stream; }} />
          <Button variant="contained" color="secondary" onClick={closeCamera}>Close Camera</Button>
         
          <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }}></canvas>
        
          <Button variant="contained" color="primary" onClick={takePicture}>Take Picture</Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={openCamera}>Open Camera</Button>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Camera;
