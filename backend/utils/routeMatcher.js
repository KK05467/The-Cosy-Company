export const isSameRoute = (
  rideStart,
  rideEnd,
  requestStart,
  requestEnd
) => {

  const sameStart =
    rideStart.toLowerCase()
      .includes(
        requestStart.toLowerCase()
      );

  const sameEnd =
    rideEnd.toLowerCase()
      .includes(
        requestEnd.toLowerCase()
      );

  return sameStart && sameEnd;
};