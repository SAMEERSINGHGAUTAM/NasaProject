import React, { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
// import { FaLocationDot } from "react-icons/fa6";
import "./Map.css";

const Map = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [eonetData, setEonetData] = useState();
  const nasaAPI = "https://eonet.gsfc.nasa.gov/api/v3/events";

  const fetchNASAOENETData = async () => {
    try {
      const response = await fetch(nasaAPI);
      if (!response.ok) {
        console.log(`Error fetching EOnet data: ${response.statusText}`);
      }
      const data = await response.json();
      setEonetData(data.events);
      console.log(eonetData);
    } catch (error) {
      console.log("Error fetching DATA:", error);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map("map").setView([0, 0], 13);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLatitude(latitude);
          setUserLongitude(longitude);

          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.log("Error watching position:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = leaflet
      .marker([userLatitude, userLongitude])
      .addTo(mapRef.current);

    fetchNASAOENETData();
  }, [userLatitude, userLongitude]);

  return (
    <div id="map" className="w-full h-full" style={{ height: "100vh" }}></div>
  );
};

export default Map;
