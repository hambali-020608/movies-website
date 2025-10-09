import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import NavBar from '../components/navbar';
import VideoPlayer from '../components/videoPlayer';
import EpisodeSelector from '../components/EpisodeSelector';
import { FiServer } from 'react-icons/fi';
import { FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';

const StreamingMovies = () => {
  const { slug, type } = useParams();
  const [data, setData] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const cleanSlug = slugify(slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url =
          type === 'series'
            ? `https://profesor-api.vercel.app/api/movies/v1/download?slug=${cleanSlug}&type=TV-Shows`
            : `https://profesor-api.vercel.app/api/movies/v1/download?slug=${cleanSlug}`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data);

        if (data.links?.length) setSelectedLink(data.links[0].url);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug, type]);

  const handleEpisodeSelect = async (episode) => {
    try {
      const res = await fetch(
        `https://profesor-api.vercel.app/api/movies/v1/streaming-drama?slug=${encodeURIComponent(
          episode.href
        )}`
      );
      const data = await res.json();
      const stream = data.servers?.[0]?.url || data.downloadLinks?.[0]?.url;
      if (stream) setSelectedLink(stream);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  };

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
          <VideoPlayer url={selectedLink} title={data.title} />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 space-y-10">
        {/* Tampilkan hanya jika type = series */}
        {type === 'series' && data.seasons && (
          <EpisodeSelector seasons={data.seasons} onSelect={handleEpisodeSelect} />
        )}

        {/* Info umum */}
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

          {/* Server pilihan */}
          {data.links && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700">
              {data.links.map((link, i) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamingMovies;
