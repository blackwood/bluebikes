import csv from "csvtojson";
import fs from "node:fs";

const csvFilePath = "./data/current_bluebikes_stations.csv";

csv()
  .fromFile(csvFilePath)
  .then((rows) => {
    fs.writeFile("./data/stations.json", JSON.stringify(rows), (err) => {
      console.error(err);
    });
  });
