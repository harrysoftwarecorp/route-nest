import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./TheMap.css";
import RoutingMachine from "./RoutingMachine";

export const TheMap = () => {
  const position: [number, number] = [10.776, 106.695];
  return (
    <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine />
    </MapContainer>
  );
};
