import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ url, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url || !videoRef.current) return;

    const loadHls = async () => {
      // Load HLS.js dari CDN jika belum ada
      if (!window.Hls) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      const Hls = window.Hls;
      const video = videoRef.current;

      // Reset video sebelum attach HLS
      video.src = '';
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js error:', data);
        });

        // Cleanup saat unmount atau ganti URL
        return () => hls.destroy();
      } else {
        // Fallback untuk browser yang support native HLS
        video.src = url;
      }
    };

    const cleanup = loadHls();

    // Jika loadHls mengembalikan cleanup, jalankan saat unmount
    return () => {
      if (cleanup && typeof cleanup === 'function') cleanup();
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
