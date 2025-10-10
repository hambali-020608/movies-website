import React, { useState, useMemo, useCallback } from 'react';

const EpisodeSelector = ({ seasons, onSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [activeEpisode, setActiveEpisode] = useState(null);

  // ✅ Gunakan useCallback agar fungsi tidak berubah di setiap render
  const handleSeasonChange = useCallback(
    (e) => {
      const newSeason = seasons.find((s) => s.season === Number(e.target.value));
      if (newSeason) {
        setSelectedSeason(newSeason);
        setActiveEpisode(null); // reset episode aktif saat ganti season
      }
    },
    [seasons]
  );

  const handleSelectEpisode = useCallback(
    (episode) => {
      setActiveEpisode(episode.href);
      onSelect(episode);
    },
    [onSelect]
  );

  // ✅ Gunakan useMemo agar daftar episode tidak dihitung ulang tanpa perubahan season/activeEpisode
  const episodeButtons = useMemo(
    () =>
      selectedSeason.episodes.map((ep, idx) => (
        <button
          key={idx}
          onClick={() => handleSelectEpisode(ep)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeEpisode === ep.href
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
          }`}
        >
          {ep.text}
        </button>
      )),
    [selectedSeason.episodes, activeEpisode, handleSelectEpisode]
  );

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
      <div className="flex flex-col gap-6">
        {/* Pilih Season */}
        <div>
          <label className="text-slate-300 mr-3 font-medium">Season:</label>
          <select
            value={selectedSeason.season}
            onChange={handleSeasonChange}
            className="bg-slate-900 text-slate-200 rounded-lg p-2 border border-slate-600"
          >
            {seasons.map((s) => (
              <option key={s.season} value={s.season}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Daftar Episode */}
        <div className="flex flex-wrap gap-3">{episodeButtons}</div>
      </div>
    </div>
  );
};

export default React.memo(EpisodeSelector); // ✅ Hindari re-render kalau props tidak berubah
