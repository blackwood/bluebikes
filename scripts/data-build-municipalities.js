import stations from "../data/stations.json" assert { type: "json" };
import fs from "node:fs";

const municipalities = Array.from(
  new Set(stations.map((station) => station.municipality))
);

fs.writeFile(
  "./data/municipalities.json",
  JSON.stringify(municipalities),
  (err) => {
    console.error(err);
  }
);
