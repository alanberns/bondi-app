import L from "leaflet";

const busIcon = new L.Icon({
  iconUrl: "/bus-icon.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  tooltipAnchor: [0, -32],
  className: "bus-marker-icon"
});

export default busIcon;
