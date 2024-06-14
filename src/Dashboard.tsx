import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navigation from "./Navigation";

export default function Dashboard() {
  return (
    <>
      <Navigation />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="flex-grow flex-col">
        <div className="grid grid-cols-2 h-full">
          <MapContainer center={[42.3736, -71.1097]} zoom={14}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
            />
          </MapContainer>
          <div className="bg-transparent">
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
}
