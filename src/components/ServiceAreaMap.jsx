// src/components/ServiceAreaMap.jsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./serviceAreaMap.css";

// Keyless tiles. They ship light, so serviceAreaMap.css inverts the tile pane
// to match the dark theme.
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function ServiceAreaMap({ cities, ariaLabel }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      // Wheel zoom off and no drag on touch: both would otherwise hijack the
      // page's Lenis smooth scroll when the pointer is over the map.
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
    });

    L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map);

    const icon = L.divIcon({
      className: "rc-pin-wrap",
      html: `<svg class="rc-pin" width="18" height="24" viewBox="0 0 24 32" aria-hidden="true">
               <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
                     fill="#1E90FF" stroke="#FFFFFF" stroke-width="2.5"/>
               <circle cx="12" cy="12" r="4.5" fill="#FFFFFF"/>
             </svg>`,
      iconSize: [18, 24],
      iconAnchor: [9, 24],
    });

    cities.forEach((city) => {
      L.marker([city.lat, city.lng], { icon })
        .addTo(map)
        .bindTooltip(city.name, {
          direction: "top",
          offset: [0, -22],
          className: "rc-tip",
        });
    });

    map.fitBounds(
      L.latLngBounds(cities.map((city) => [city.lat, city.lng])),
      { padding: [30, 30] },
    );

    // The section is lazy-loaded inside an animated container, so the div can
    // still measure 0 on first paint.
    const raf = requestAnimationFrame(() => map.invalidateSize());

    return () => {
      cancelAnimationFrame(raf);
      map.remove();
    };
  }, [cities]);

  return (
    <div
      ref={containerRef}
      className="rc-map h-full w-full"
      role="application"
      aria-label={ariaLabel}
    />
  );
}
