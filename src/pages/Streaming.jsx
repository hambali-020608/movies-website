import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import NavBar from '../components/navbar';
import EpisodeSelector from '../components/EpisodeSelector';
import { FiServer } from 'react-icons/fi';
import { FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';

const StreamingMovies = () => {
  const { slug, type } = useParams();
  const [data, setData] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const cleanSlug = useMemo(() => {
    const slugify = (str) =>
      decodeURIComponent(str)
        .replace(/\((\d{4})\)/, '-$1')
        .replace(/&/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/gi, '')
        .replace(/-+/g, '-')
        .replace('Nonton', '')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    return slugify(slug);
  }, [slug]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const url =
        type === 'series'
          ? `https://profesor-api.vercel.app/api/movies/v1/download?slug=${cleanSlug}&type=TV-Shows`
          : `https://profesor-api.vercel.app/api/movies/v1/download?slug=${cleanSlug}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      setData(json);
      if (json.links?.length) setSelectedLink(json.links[0].url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [cleanSlug, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEpisodeSelect = useCallback(async (episode) => {
    try {
      const res = await fetch(
        `https://profesor-api.vercel.app/api/movies/v1/streaming-drama?slug=${encodeURIComponent(
          episode.href
        )}`
      );
      const json = await res.json();
      const stream = json.servers?.[0]?.url || json.downloadLinks?.[0]?.url;
      if (stream) setSelectedLink(stream);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ Dynamic import HLS.js agar Vite build aman
  useEffect(() => {
    if (!selectedLink || !videoRef.current) return;

    let hls;

    const initHls = async () => {
      const HlsModule = await import('hls.js');
      const Hls = HlsModule.default;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(selectedLink);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js error:', data);
        });
      } else {
        videoRef.current.src = selectedLink;
      }
    };

    initHls();

    return () => {
      if (hls) hls.destroy();
    };
  }, [selectedLink]);

  const serverButtons = useMemo(() => {
    if (!data?.links) return null;
    return data.links.map((link, i) => (
      <button
        key={i}
        onClick={() => setSelectedLink(link.url)}
        className={`px-5 py-2 rounded-lg transition-all ${
          selectedLink === link.url
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        <FiServer className="inline mr-2" />
        {link.server}
      </button>
    ));
  }, [data?.links, selectedLink]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Data not found
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <div className="pt-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 space-y-10">
        {type === 'series' && data.seasons && (
          <EpisodeSelector seasons={data.seasons} onSelect={handleEpisodeSelect} />
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
          <h1 className="text-3xl font-bold text-slate-100">{data.title}</h1>
          <div className="flex flex-wrap gap-4">
            {data.rating && (
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar /> {data.rating}
              </div>
            )}
            {data.year && (
              <div className="flex items-center gap-2 text-blue-400">
                <FaCalendarAlt /> {data.year}
              </div>
            )}
            {data.duration && (
              <div className="flex items-center gap-2 text-cyan-400">
                <FaClock /> {data.duration}
              </div>
            )}
          </div>
          <p className="text-slate-300">{data.synopsis || data.seriesStatus}</p>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700">
            {serverButtons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingMovies;
