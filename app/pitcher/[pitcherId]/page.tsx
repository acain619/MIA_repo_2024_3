"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PitcherInfo from "../../../components/ui/player-info";
import { PitchPlot } from "../../../components/ui/pitch-plot";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
/**
 *
 * If you would like to display the pitcher's image, you can use the image hosted at
 * https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/{pitcherId}/headshot/silo/current
 *
 */
export default function Page() {
  const urlParams = useParams();
  const urlID = urlParams.pitcherId
  const [pitcherId, setPitcherId] = useState(urlID);
  const [pitches_json, setPitchesJson] = useState('');
  const [pitchers_json, setPitchersJson] = useState({ pitchers: [] });

  useEffect(() => {
    const initialPitcherId = urlParams.pitcherId;
    setPitcherId(initialPitcherId);
  }, [urlParams.pitcherId]);

  useEffect(() => {
    const getPitchersAll = async () => {
      try {
        let pitchers_data = await fetch(`https://mia-api.vercel.app/api/pitchers`);
        let pitchers_json = await pitchers_data.json();
        setPitchersJson(pitchers_json);
      } catch (error) {
        console.log("pitchers error...");
        console.error("Error fetching pitchers:", error);
        setPitchersJson({ pitchers: [] });
      }
    };
  
    getPitchersAll();
  }, []);

  useEffect(() => {
    const getPitches = async () => {
      if (pitcherId) {
        let pitches_data = await fetch(
          `https://mia-api.vercel.app/api/pitches?pitcherId=${pitcherId}`
        );
        let pitches_json = await pitches_data.json();
        setPitchesJson(pitches_json);
      }
    };

    getPitches();
  }, [pitcherId]);

  const pitcherChanged = (value) => {
    setPitcherId(value)
  };

  return (
    <div className="mb-4 grid-container">
      <div className="align-items-center">
        <Select value={pitcherId} onValueChange={pitcherChanged}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose a pitcher..." />
          </SelectTrigger>
          <SelectContent>
            {pitchers_json.pitchers.length > 0 && pitchers_json.pitchers.map((pitcher) => (
              <SelectItem key={pitcher.id} value={pitcher.id}>
                {pitcher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {pitcherId ? <PitcherInfo pitcherId={pitcherId} /> : "" }
      {pitches_json.pitches ? <PitchPlot className="w-64" pitches={pitches_json.pitches} /> : "Waiting for Pitcher Selection..." }
    </div>
  );
}
