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
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
/**
 *
 * If you would like to display the pitcher's image, you can use the image hosted at
 * https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/{pitcherId}/headshot/silo/current
 *
 */
export default function Page() {
  const url_params = useParams();
  const url_id = url_params.pitcherId;
  const [pitcher_id, set_pitcher_id] = useState<string | undefined>(
    Array.isArray(url_id) ? url_id[0] : url_id
  );
  const [pitches_json, set_pitches_json] = useState("");
  const [pitchers_json, set_pitchers_json] = useState({ pitchers: [] });

  useEffect(() => {
    const initial_pitcher_id = url_params.pitcherId;
    set_pitcher_id(Array.isArray(initial_pitcher_id) ? initial_pitcher_id[0] : initial_pitcher_id);
  }, [url_params.pitcherId]);
  useEffect(() => {
    const getPitchersAll = async () => {
      try {
        const pitchers_data = await fetch(
          `https://mia-api.vercel.app/api/pitchers`
        );
        const pitchers_json = await pitchers_data.json();
        set_pitchers_json(pitchers_json);
      } catch (error) {
        console.error("Error fetching pitchers:", error);
        set_pitchers_json({ pitchers: [] });
      }
    };

    getPitchersAll();
  }, []);

  useEffect(() => {
    const getPitches = async () => {
      if (pitcher_id) {
        const pitches_data = await fetch(
          `https://mia-api.vercel.app/api/pitches?pitcherId=${pitcher_id}`
        );
        const pitches_json = await pitches_data.json();
        set_pitches_json(pitches_json);
      }
    };

    getPitches();
  }, [pitcher_id]);

  const pitcher_changed = (pitcher_value: string) => {
    set_pitcher_id(pitcher_value);
  };

  return (
    <div className="mb-4 grid-container">
      <div className="align-items-center">
        <Select value={pitcher_id} onValueChange={pitcher_changed}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose a pitcher..." />
          </SelectTrigger>
          <SelectContent>
            {pitchers_json.pitchers.length > 0 &&
              pitchers_json.pitchers.map((pitcher) => (
                <SelectItem key={pitcher["id"]} value={pitcher["id"]}>
                  {pitcher["name"]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {pitcher_id ? <PitcherInfo pitcher_id={pitcher_id} /> : ""}
      {pitches_json["pitches"] ? (
        <PitchPlot className="w-64" pitches={pitches_json["pitches"]} />
      ) : (
        "Waiting for Pitcher Selection..."
      )}
    </div>
  );
}
