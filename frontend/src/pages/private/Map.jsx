import React, { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import { userIcon, fireIcon } from "../../utils/Icons"; // Assuming you have a fire icon
import "./Map.css";

const Map = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [wildfireEvents, setWildfireEvents] = useState([]);

  const nasaAPI = "https://eonet.gsfc.nasa.gov/api/v3/events";

  const fetchNASAOENETData = async () => {
    try {
      const response = await fetch(nasaAPI);
      if (!response.ok) {
        throw new Error(`Error fetching EONET data: ${response.statusText}`);
      }
      const data = await response.json();

      // Filter by wildfires:
      const filteredWildFires = data.events.filter(
        (event) =>
          event.categories.some(
            (eventCategory) => eventCategory.id === "wildfires"
          ) && event.geometry?.length > 0
      );

      const wildFireEventData = filteredWildFires.map((event) => ({
        id: event.id,
        coordinates: event.geometry[0].coordinates,
      }));

      setWildfireEvents(wildFireEventData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      .marker([userLatitude, userLongitude], {
        icon: userIcon,
      })
      .addTo(mapRef.current).bindPopup(`
        <div class="rounded-lg">
          <p class="text-lg font-semibold">Your location!</p>
        </div>
      `);

    fetchNASAOENETData();
  }, [userLatitude, userLongitude]);

  useEffect(() => {
    // Create markers for each wildfire event
    wildfireEvents.forEach((event) => {
      leaflet
        .marker(event.coordinates, {
          icon: fireIcon, // Use your fire icon here
        })
        .addTo(mapRef.current).bindPopup(`
        <div class="rounded-lg">
          <p class="text-lg font-semibold">Wildfire Event</p>
        </div>
      `);
    });
  }, [wildfireEvents]);

  return (
    <div id="map" className="w-full h-full" style={{ height: "100vh" }}></div>
  );
};

export default Map;
