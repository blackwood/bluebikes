import municipalities from "../data/municipalities.json" assert { type: "json" };
import station_trip_totals from "../data/analysis.json" assert { type: "json" };
import stations from "../data/stations.json" assert { type: "json" };

import fs from "node:fs";
import { produce } from "immer";

// Note: 479, 491 respectively
// console.log("station_trip_totals", Object.keys(station_trip_totals).length);
// console.log("stations", stations.length);

const muni_trip_totals = Object.entries(station_trip_totals).reduce(
  (state, [a, { muni, start, end }]) => {
    console.log(muni, start, end, Object.hasOwnProperty(state, muni));
    return produce(state, (draft) => {
      if (!state[muni]) {
        draft[muni] = { start, end };
      } else {
        draft[muni] = {
          start: state[muni].start + start,
          end: state[muni].end + end,
        };
      }
    });
  },
  {}
);

fs.writeFile(
  "./data/analysis-muni.json",
  JSON.stringify(muni_trip_totals),
  (err) => {
    console.error(err);
  }
);
