import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import NavBar from '../components/navbar';
import VideoPlayer from '../components/videoPlayer';
import EpisodeSelector from '../components/EpisodeSelector';
import MoviesDescription from '../components/MoviesDescription';
import ButtonServer from '../components/ButtonServer';

const StreamingMovies = () => {
  const { slug, type } = useParams();
  const [data, setData] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Gunakan useMemo agar slugify tidak dihitung ulang setiap render
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

  // ✅ Cache fungsi fetchData agar tidak membuat fungsi baru setiap render
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
      console.log("streaming data",json);
      
      setData(json.data);

      // Ambil link pertama sebagai default
      console.log("links",json.data.links.length);
      if (json.data.links.length) setSelectedLink(json.data.links[0].url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [cleanSlug, type]);

  // ✅ Jalankan fetch hanya saat slug/type berubah
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Gunakan useCallback untuk menghindari re-render EpisodeSelector setiap kali render ulang
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

  // ✅ Gunakan memoized render agar bagian tertentu tidak re-render tanpa perubahan
  const serverButtons = useMemo(() => {
    if (!data?.links) return null;

    return data.links.map((link, i) => (
      <ButtonServer
        iteration={i}
        onClick={() => setSelectedLink(link.url)}
        isActive={selectedLink === link.url}
        link={link.server}
      />
      
    ));
  }, [data?.links, selectedLink]);

  // ✅ State loading & error cepat
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
        {/* Episode hanya jika series */}
        {type === 'series' && data.seasons && (
          <EpisodeSelector seasons={data.seasons} onSelect={handleEpisodeSelect} />
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
        {console.log(data)}
        <MoviesDescription title={data.title} synopsis={data.synopsis} year={data.releaseYear} rating={data.imdb}  />
          {/* Server pilihan */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700">
            {serverButtons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingMovies;
