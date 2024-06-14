import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navigation from "./Navigation";
import stations from "./../data/stations.json";
import munis from "./../data/municipalities.json";
import DashboardHeader from "./DashboardHeader";
import { useCallback, useEffect, useState } from "react";
import MunicipalitySelect from "./MunicipalitySelect";
import { produce } from "immer";
import { populateMuniDict, formatTotal } from "./util";
import Stat from "./Stat";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    municipality: null,
  });

  const [muniTotals, setMuniTotals] = useState(populateMuniDict(munis));
  const [stationTotals, setStationTotals] = useState({});

  const getStationCountForMuni = (muni: string) =>
    stations.filter((s) => s.municipality === muni).length;

  const stationCountForSystem = stations.length;

  const systemTotal = Object.entries(muniTotals).reduce(
    (state, [, { start, end }]) => {
      return {
        start: state.start + start,
        end: state.end + end,
      };
    },
    { start: 0, end: 0 }
  );

  useEffect(() => {
    const fetchData = async () => {
      const amuni_response = await fetch("/analysis-muni.json");
      const amuni_data = await amuni_response.json();
      setMuniTotals(amuni_data);

      const astati_response = await fetch("/analysis.json");
      const astati_data = await astati_response.json();
      console.log(astati_data);
      setStationTotals(astati_data);
    };
    fetchData();
  }, []);

  const handleSelect = useCallback((value) => {
    setFilters(
      produce((draft) => {
        draft.municipality = value;
      })
    );
  }, []);

  console.log(stationTotals);

  return (
    <>
      <Navigation />
      <header className="bg-white shadow">
        <DashboardHeader />
      </header>
      <main className="flex-grow flex-col">
        <div className="grid grid-cols-2 h-full">
          <MapContainer center={[42.3736, -71.1097]} zoom={11}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
            />
            {stations
              .filter(
                (station) =>
                  !filters.municipality ||
                  station.municipality === filters.municipality
              )
              .map((station) => {
                return (
                  <Marker
                    key={station.id}
                    position={[station.lat, station.long]}
                  >
                    <Popup>
                      <h3 className="text-lg">{station.name}</h3>
                      <p>{station.number}</p>
                      {stationTotals[station.number] && (
                        <>
                          <p>
                            Origin Trips: {stationTotals[station.number].start}
                          </p>
                          <p>
                            Destination Trips:{" "}
                            {stationTotals[station.number].end}
                          </p>
                        </>
                      )}
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
          <div className="bg-transparent p-8">
            <div>
              <MunicipalitySelect munis={munis} onSelect={handleSelect} />
            </div>
            <div>
              {!filters.municipality && (
                <>
                  <h2 className="py-10 text-center text-5xl font-bold">
                    All Station Data
                  </h2>
                  <div className="text-center">
                    <div className="stats shadow">
                      <Stat
                        title="No. Stations"
                        value={stationCountForSystem}
                      />
                      <Stat
                        title="No. Origin Trips"
                        value={formatTotal(systemTotal.start)}
                      />
                      <Stat
                        title="No. Destination Trips"
                        value={formatTotal(systemTotal.end)}
                      />
                    </div>
                  </div>
                </>
              )}
              {filters.municipality && (
                <>
                  <h2 className="py-10 text-center text-5xl font-bold">
                    {filters.municipality}
                  </h2>
                  <div className="text-center">
                    <div className="stats shadow">
                      <Stat
                        title="No. Stations"
                        value={getStationCountForMuni(filters.municipality)}
                      />
                      <Stat
                        title="No. Origin Trips"
                        value={formatTotal(
                          muniTotals[filters.municipality].start
                        )}
                      />
                      <Stat
                        title="No. Destination Trips"
                        value={formatTotal(
                          muniTotals[filters.municipality].end
                        )}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
