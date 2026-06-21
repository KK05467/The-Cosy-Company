/**
 * geocode.js
 * Converts a human-readable address string into {lat, lng} coordinates
 * using the free Nominatim (OpenStreetMap) geocoding API.
 *
 * Returns: { lat: Number, lng: Number } or null on failure.
 */

export const geocodeLocation = async (address) => {
  try {
    const encoded = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Cosy/1.0 (carpooling app)",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Nominatim error:", await response.text());
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      console.error(`Nominatim: No results for "${address}"`);
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("geocodeLocation error:", error.message);
    return null;
  }
};