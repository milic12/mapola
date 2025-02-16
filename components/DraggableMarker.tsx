import { useStateContex } from "@/context/StateContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
const center = {
  lat: 43.509,
  lng: 16.44,
};

interface draggableMarkerProps {
  mapPin: string;
  screenWidth: number;
}

const DraggableMarker = ({ mapPin, screenWidth }: draggableMarkerProps) => {
  const { setMapPinLocation, mapPinLocation } = useStateContex();

  const checkPinLocation = mapPinLocation.lat && mapPinLocation.lng;

  const [draggable, setDraggable] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(
    checkPinLocation ? mapPinLocation : center
  );
  const markerRef = useRef(null);

  const map = useMapEvent("click", (e) => {
    const marker: any = markerRef.current;
    setMarkerPosition(e.latlng);
    setMapPinLocation(e.latlng);
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setMarkerPosition(marker.getLatLng());
          setMapPinLocation(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: mapPin,
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  }, [mapPin]);

  const createIcon = (url: string) => {
    if (screenWidth > 768) {
      return new L.Icon({
        iconUrl: url,
        iconSize: [36, 36],
        iconAnchor: [16, 36],
      });
    } else {
      return new L.Icon({
        iconUrl: url,
        iconSize: [16, 16],
        iconAnchor: [8, 16],
      });
    }
  };

  const getMarkerIcon = (mapPin: string) => {
    if (mapPin === "pin") {
      return createIcon("/images/map-markers/marker.svg");
    } else if (mapPin === "love") {
      return createIcon("/images/love.svg");
    }
  };

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={getMarkerIcon(mapPin)}
    >
      {/* <Popup minWidth={90} className="leaflet-popup">
        <button onClick={toggleDraggable}>
          {draggable
            ? "Marker je sada moguće pomicati!"
            : "Kliknite ovdje kako biste omogućili pomicanje markera"}
        </button>
      </Popup> */}
    </Marker>
  );
};

export default DraggableMarker;
