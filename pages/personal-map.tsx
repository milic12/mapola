import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";

const PersonalMap = dynamic(
  () => import("../components/personalMap/PersonalMap"),
  {
    ssr: false,
  }
);

const PersonalMapPage = () => {
  return <PersonalMap />;
};

export default PersonalMapPage;
