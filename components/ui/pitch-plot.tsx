import React, { SVGProps, useState, useMemo } from "react";
import { cn } from "../../lib/utils";

/**
 * PitchPlotPitch
 * This structure is the minimum data structure representing a single pitch
 * that is currently required to properly render pitches on this pitch plot.
 *
 * Feel free to augment the type of PitchPlotPitch if that would improve your implementation.
 */

type PitchPlotPitch = {
  pitch_id: string;
  pitcher_id: string;
  batter_name: string;
  batter_stance: string;
  batter_position: string;
  batter_birth_date: string;
  is_swing: boolean;
  is_contact: boolean;
  is_in_play: boolean;
  is_strike: boolean;
  play_result: string;
  pitch_type: string;
  velocity: number;
  spin_rate: number;
  release_location_x: number;
  release_location_y: number;
  release_location_z: number;
  location_x: number;
  location_z: number;
} & SVGProps<SVGCircleElement>;

/**
 * PitchPlotProps
 * This structure is the minimum data structure representing the props for this component
 * that is required to implement all functionality in the prompt.
 *
 * Feel free to augment the type of PitchPlotProps if that would improve your implementation.
 */
type PitchPlotProps = {
  pitches: PitchPlotPitch[];
  on_pitch_click?: (pitch: PitchPlotPitch) => void;
};

const PitchPlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PitchPlotProps
>(({ className, pitches, on_pitch_click, ...props }, ref) => {
  const [selected_pitch, set_selected_pitch] = useState<PitchPlotPitch | null>(
    null
  );

  const pitch_colors = useMemo(
    () => ({
      FF: "#FF0000",
      CU: "#0000FF",
      SL: "#0066FF",
      CH: "#FFA500",
      SI: "#800080",
      FC: "#00CC00",
      ST: "#FF66FF",
      SV: "#A9A9A9",
      Default: "#000000",
    }),
    []
  );
  // height and width are in feet
  const height = 5;
  const width = 4;

  const baseballDiameter = 2.9 / 12;

  // the coordinate dimensions of the solid-line strike zone
  const strikeZone = {
    left: ((17 / 2) * -1) / 12,
    width: 17 / 12,
    top: 43 / 12,
    height: 25 / 12,
  };
  // the coordinate dimensions of the dotted-line strike zone
  // this strike zone represents the width of one baseball outside of the true strike zone
  const outerStrikeZone = {
    left: strikeZone.left - baseballDiameter,
    width: strikeZone.width + baseballDiameter * 2,
    top: strikeZone.top + baseballDiameter,
    height: strikeZone.height + baseballDiameter * 2,
  };

  const get_pitch_type_color = (pitch_type: string) => {
    return (
      pitch_colors[pitch_type as keyof typeof pitch_colors] ||
      pitch_colors.Default
    );
  };

  const single_pitch_click = (pitch: PitchPlotPitch) => {
    set_selected_pitch(pitch);
    if (on_pitch_click) {
      on_pitch_click(pitch);
    }
  };

  // positive x-coordinates are towards first base and negative x-coordinates are towards third base
  return (
    <div className="flex flex-col md:flex-row gap-4" ref={ref} {...props}>
      <div className={cn(className)}>
        <svg
          className="border border-border rounded-lg"
          viewBox={`${(width / 2) * -1} 0 ${width} ${height}`}
        >
          {pitches.map((p) => {
            return (
              <circle
                key={p.pitch_id}
                cx={p.location_x}
                cy={height - p.location_z}
                fill={get_pitch_type_color(p.pitch_type)}
                r={baseballDiameter / 2}
                onClick={() => single_pitch_click(p)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
          <rect
            x={strikeZone.left}
            y={height - strikeZone.top}
            width={strikeZone.width}
            height={strikeZone.height}
            fill="transparent"
            stroke="black"
            strokeWidth={0.3 / 12}
            className="pointer-events-none"
          ></rect>
          <rect
            x={outerStrikeZone.left}
            y={height - outerStrikeZone.top}
            width={outerStrikeZone.width}
            height={outerStrikeZone.height}
            fill="transparent"
            stroke="black"
            strokeWidth={0.15 / 12}
            strokeDasharray={".1 .1"}
            className="pointer-events-none"
          ></rect>
        </svg>
        <span className="text-xs italic">Pitcher perspective</span>
      </div>
      <div className={`rounded-xl bg-white mt-4 shadow-sm p-4`}>
        {selected_pitch ? (
          <div id="pitchInfo">
            <h3 className="text-lg font-semibold mb-2">Pitch Information</h3>
            <p>
              <b>Batter:</b> {selected_pitch.batter_name}
            </p>
            <p>
              <b>Batter Stance:</b> {selected_pitch.batter_stance}
            </p>
            <p>
              <b>Pitch Type:</b> {selected_pitch.pitch_type}
            </p>
            <p>
              <b>Velocity:</b> {selected_pitch.velocity} mph
            </p>
            <p>
              <b>Spin Rate:</b> {selected_pitch.spin_rate} rpm
            </p>
            <p>
              <b>H Rel Point:</b> {selected_pitch.release_location_x}
            </p>
            <p>
              <b>V Rel Point:</b> {selected_pitch.release_location_z}
            </p>
            <p>
              <b>In Play?:</b> {selected_pitch.is_in_play ? "Yes" : "No"}
            </p>
            <p>
              <b>Swing?:</b> {selected_pitch.is_swing ? "Yes" : "No"}
            </p>
            <p>
              <b>Contact?:</b> {selected_pitch.is_contact ? "Yes" : "No"}
            </p>
            <p>
              <b>Result:</b> {selected_pitch.play_result}
            </p>
          </div>
        ) : (
          <p>Click on a pitch to see its information</p>
        )}
      </div>
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Pitch Type Legend</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(pitch_colors).map(([type, color]) => (
            <div key={type} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-1"
                style={{ backgroundColor: color }}
              ></div>
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
PitchPlot.displayName = "PitchPlot";

export { PitchPlot };

export type { PitchPlotPitch, PitchPlotProps };
