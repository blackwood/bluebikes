import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navigation from "./Navigation";
import stations from "./../data/stations";
import munis from "./../data/municipalities.json";
import DashboardHeader from "./DashboardHeader";
import { useCallback, useState } from "react";
import MunicipalitySelect from "./MunicipalitySelect";
import { produce } from "immer";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    municipality: null,
  });

  const handleSelect = useCallback((value) => {
    setFilters(
      produce((draft) => {
        console.log({ value, draft });
        draft.municipality = value;
      })
    );
  }, []);

  console.log(filters);

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
                    <Popup>{station.name}</Popup>
                  </Marker>
                );
              })}
          </MapContainer>
          <div className="bg-transparent">
            <div>
              <MunicipalitySelect munis={munis} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
