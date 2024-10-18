# API Documentation

### `https://mia-api.vercel.app/api/pitchers`

#### Response structure

```
{
    pitchers: Array<{
        id: string;
        name: string;
        pitcher_stance: "R" | "L";
        pitcher_position: "SP" | "RP";
        pitcher_birth_date: string;
        organization_name: string;
        organization_abbreviation: string;
    }>
}
```

Below are the definitions for each of the fields:

- <b>id</b>: the unique id of the pitcher.
- <b>name</b>: the name of the pitcher.
- <b>pitcher_stance</b>: the throwing-hand stance of the pitcher. Values include:
  - R: right-handed
  - L: left-handed
- <b>pitcher_position</b>: the position of the pitcher. Values include:
  - SP: Starting pitcher
  - RP: Relief pitcher
- <b>pitcher_birth_date</b>: the string representation of the pitcher's birthday.
- <b>organization_name</b>: the name of the organization the player plays for.
- <b>organization_abbreviation</b>: the abbreviation of the organization the player plays for.

</br>

---

</br>

### `https://mia-api.vercel.app/api/pitcher-info?pitcherId=`

The query parameter is the `id` of the pitcher you are requesting info about.

#### Response structure

```
{
    pitcherInfo: {
        id: string;
        name: string;
        pitcher_stance: "R" | "L";
        pitcher_position: "SP" | "RP";
        pitcher_birth_date: string;
        organization_name: string;
        organization_abbreviation: string;
    }
}
```

> If the `pitcherId` query parameter is not passed into the API, an error is thrown

> If there is no pitcher found with the passed in `pitcherId`, an error is thrown

Below are the definitions for each of the fields:

- <b>id</b>: the unique id of the pitcher.
- <b>name</b>: the name of the pitcher.
- <b>pitcher_stance</b>: the throwing-hand stance of the pitcher. Values include:
  - R: right-handed
  - L: left-handed
- <b>pitcher_position</b>: the position of the pitcher. Values include:
  - SP: Starting pitcher
  - RP: Relief pitcher
- <b>pitcher_birth_date</b>: the string representation of the pitcher's birthday.
- <b>organization_name</b>: the name of the organization the player plays for.
- <b>organization_abbreviation</b>: the abbreviation of the organization the player plays for.

</br>

---

</br>

### `https://mia-api.vercel.app/api/pitches?pitcherId=`

The query parameter is the `id` of the pitcher you are requesting pitches for.

#### Response structure

```
{
    pitches: Array<{
        pitch_id: string;
        pitcher_id: string;
        batter_name: string;
        batter_stance: "R" | "L" | "S";
        batter_position: "1B" | "2B" | "3B" | "C" | "CF" | "LF" | "RF" | "SS" | "RP" | "SP";
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
    }>
}
```

> If the `pitcherId` query parameter is not passed into the API, an error is thrown

Below are the definitions for each of the fields:

- <b>pitch_id</b>: the unique id of the pitch.
- <b>pitcher_id</b>: the unique id of the pitcher.
- <b>batter_name</b>: the name of the batter.
- <b>batter_stance</b>: the stance of the batter. Values include
  - R: right-handed
  - L: left-handed
  - S: switch hitter, meaning the player hits from both the right and left sides of the plate
- <b>batter_position</b>: the position the batter plays. Values include

  - 1B: First base
  - 2B: Second base
  - 3B: Third base
  - C: Catcher
  - CF: Center field
  - LF: Left field
  - RF: Right field
  - SS: Shortstop
  - SP: Starting pitcher
  - RP: Relief pitcher

- <b>batter_birth_date</b>: a string representation of the batter's birthdate.
- <b>is_swing</b>: if the pitch was swung at.
- <b>is_contact</b>: if the batter made contact with the ball, irrespective of the outcome. Foul balls and caught balls will still be marked as `true`.
- <b>is_in_play</b>: if the batter hit the ball in play. Home runs and caught balls will be marked as `true`. Foul balls will be marked as `false`.
- <b>is_strike</b>: if the pitch was a strike, excluding foul balls. Pitches where a batter does not swing but the umpire calls a strike and pitches where the batter swings and misses the ball will be marked as `true`. Pitches where the batter hits a foul ball will be marked as `false`.
- <b>play_result</b>: the result of the plate appearance.
- <b>pitch_type</b>: the type of the pitch. Values include
  - FF: Four-seam FB
  - FC: Cutter
  - CU: Curveball
  - CH: Changeup
  - SL: Slider
  - SI: Sinker
  - ST: Sweeper
  - SV: Slurve
- <b>velocity</b>: the velocity of the pitch in mph.
- <b>spin_rate</b>: the spin rate of the pitch in rotations per minute (RPM).
- <b>release_location_x</b>: the `x` location in coordinate space of pitch's release in feet, where the `x` axis runs from first base towards third base. Also known as horizontal release point.
- <b>release_location_y</b>: the `y` location in coordinate space of pitch's release in feet, where the `y` axis runs from home plate towards the pitcher's mound. Also known as release extension.
- <b>release_location_z</b>: the `z` location in coordinate space of pitch's release in feet, where the `z` axis runs from the ground upwards. Also known as vertical release point.
- <b>location_x</b>: the `x` location in coordinate space of where the pitch crossed the front of home plate in feet, where the `x` axis runs from first base to third base.
- <b>location_z</b>: the `z` location in coordinate space of where the pitch crossed the front of home plate in feet, where the `z` axis runs from the ground upwards.
