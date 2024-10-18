import { useState, useEffect } from 'react';

function PitcherInfo({ pitcherId }) {
  const [pitcherInfo, setPitcherInfo] = useState(null);
  
  useEffect(() => {
    const getPitcherInfo = async () => {
      if (!pitcherId) return; // Don't fetch if pitcherId is not valid
      
      try {
        const response = await fetch(
          `https://mia-api.vercel.app/api/pitcher-info?pitcherId=${pitcherId}`
        );
        const json = await response.json();
        setPitcherInfo(json.pitcherInfo);
      } catch (error) {
        console.error("Error fetching pitcher info:", error);
      }
    };

    getPitcherInfo();
  }, [pitcherId]); // Only run effect when pitcherId changes

  if (!pitcherInfo) {
    return <div>No pitcher info available.</div>; // Handle no data
  }

  return (
    <div className={`rounded-xl bg-white mt-4 shadow-sm`}>
      <div
        className={`p-6 bg-[#00A3E0] bg-blend-soft-light rounded-t-xl flex gap-6 items-center`}
      >
        <img
          src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${pitcherId}/headshot/silo/current`}
          className="w-16 rounded-xl bg-white"
          alt={pitcherInfo.name}
        />
        <div className="text-white text-2xl font-wide">
          <div className="uppercase">{pitcherInfo.name}</div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <div className="col-span-1 grid grid-cols-2">
          <span className="text-[#5E6291]">Pos</span>
          <span>{pitcherInfo.pitcher_position}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2">
          <span className="text-[#5E6291]">Org</span>
          <span>
            {pitcherInfo.organization_name} (
            {pitcherInfo.organization_abbreviation})
          </span>
        </div>
        <div className="col-span-1 grid grid-cols-2">
          <span className="text-[#5E6291]">Stance</span>
          <span>{pitcherInfo.pitcher_stance}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2">
          <span className="text-[#5E6291]">DOB</span>
          <span>{pitcherInfo.pitcher_birth_date}</span>
        </div>
      </div>
    </div>
  );
}

export default PitcherInfo;
