export const matchRoute = (
  routeCoordinates,
  riderStart,
  riderEnd
) => {

  let startIndex = -1;
  let endIndex = -1;

  for (
    let i = 0;
    i < routeCoordinates.length;
    i++
  ) {

    const point = routeCoordinates[i];

    if (
      Math.abs(point.lat - riderStart.lat) < 0.001 &&
      Math.abs(point.lng - riderStart.lng) < 0.001
    ) {

      startIndex = i;

    }

    if (
      Math.abs(point.lat - riderEnd.lat) < 0.001 &&
      Math.abs(point.lng - riderEnd.lng) < 0.001
    ) {

      endIndex = i;

    }

  }

  return (
    startIndex !== -1 &&
    endIndex !== -1 &&
    startIndex < endIndex
  );

};