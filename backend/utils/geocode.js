export const geocodeLocation = async (address) => {

  try {

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );

    const data = await response.json();

    if (!data.length) return null;

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon)
    };

  }

  catch (error) {

    console.log(error);

    return null;

  }

};