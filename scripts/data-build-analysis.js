import trips from "../data/trips.json" assert { type: "json" };
import municipalities from "../data/municipalities.json" assert { type: "json" };
import stations from "../data/stations.json" assert { type: "json" };
import { produce } from "immer";
import fs from "node:fs";

// Each trip has a start_station_id and end_station_id
// therefore, while processing each trip, we can determine
// the municipality of each from the stations list.
// Our final dictionary should have station ID as keys
// with municipality, start_count, and end_count as props
// finally, we process the dictionary one more time, to sum
// the totals by municipality.

const station_trip_totals = trips.reduce((state, trip) => {
  const points = [
    { type: "start", id: trip.start_station_id },
    { type: "end", id: trip.end_station_id },
  ];

  let next = produce(state, (draft) => {
    for (const point of points) {
      if (typeof state[point.id] === "undefined") {
        draft[point.id] = { start: 0, end: 0 };
      }
      if (Object.hasOwnProperty.call(state, point.id)) {
        draft[point.id][point.type]++;
      } else {
        draft[point.id][point.type] = 1;
      }
      if (!Object.hasOwnProperty(state[point.id], "muni")) {
        draft[point.id].muni = stations.find(
          (station) => station.number === point.id
        )?.municipality;
      }
    }
  });
  console.log("processing trip " + trip.ride_id);
  return next;
}, {});

fs.writeFile(
  "./data/analysis.json",
  JSON.stringify(station_trip_totals),
  (err) => {
    console.error(err);
  }
);
