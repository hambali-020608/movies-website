import React from 'react';

const VideoPlayer = ({ url, title }) => {
  return (
    <div className="relative aspect-video w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-800">
      {url ? (
        <iframe
          src={url}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={`${title} Player`}
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full bg-slate-900 text-slate-400">
          Pilih server atau episode untuk mulai streaming
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
