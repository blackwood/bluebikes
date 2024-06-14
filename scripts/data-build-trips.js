import csv from "csvtojson";
import fs from "node:fs";

const csvFilePath = "./data/202405-bluebikes-tripdata.csv";

csv()
  .fromFile(csvFilePath)
  .then((rows) => {
    fs.writeFile("./data/trips.json", JSON.stringify(rows), (err) => {
      console.error(err);
    });
  });
