import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ url, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url || !videoRef.current) return;

    const video = videoRef.current;

    // Reset video
    video.src = '';

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // fallback untuk Safari / browser yang support native HLS
      video.src = url;
    }

    // Cleanup saat unmount atau ganti URL
    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  return (
    <div className="relative aspect-video w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-800">
      {url ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-slate-900 text-slate-400">
          Pilih server atau episode untuk mulai streaming
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
