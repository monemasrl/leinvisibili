import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { type LatLngExpression } from "leaflet";

function SetViewOnClick({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}
function Map({ position, zoom }: { position: LatLngExpression; zoom: number }) {
  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SetViewOnClick coords={position} />
    </MapContainer>
  );
}
export default Map;
