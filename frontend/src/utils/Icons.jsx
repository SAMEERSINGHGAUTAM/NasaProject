// https://icons8.com/

import { Icon } from "leaflet";

const userIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=3nOZtpH7KQrP&format=png&color=000000",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const floodIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=lVkh90FS0wjR&format=png&color=000000",
  iconSize: [35, 35],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const fireIcon = new Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=80847&format=png&color=000000",
  iconSize: [35, 35],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

export { userIcon, floodIcon, fireIcon };
