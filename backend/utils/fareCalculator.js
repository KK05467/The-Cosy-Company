/**
 * fareCalculator.js
 * Calculates the fare for a ride segment.
 *
 * Rates:
 *   Bike : ₹5/km
 *   Car  : ₹8/km
 *
 * Surcharges:
 *   Platform charge : 30% of base fare
 *   Rain charge     : ₹79 (car only, when isRain = true)
 *   Night charge    : ₹49 (when hour >= 22)
 *
 * All amounts in INR (₹).
 */

export const calculateFare = (
  distance,   // km
  vehicleType, // "bike" | "car"
  isRain = false,
  hour = new Date().getHours()
) => {
  const rate = vehicleType === "bike" ? 5 : 8;

  const baseFare = parseFloat((distance * rate).toFixed(2));

  const platformCharge = parseFloat((baseFare * 0.30).toFixed(2));

  const rainCharge =
    vehicleType === "car" && isRain ? 79 : 0;

  const nightCharge = hour >= 22 ? 49 : 0

  const totalFare = parseFloat(
    (baseFare + platformCharge + rainCharge + nightCharge).toFixed(2)
  );

  return {
    baseFare,
    platformCharge,
    rainCharge,
    nightCharge,
    totalFare,
  };
};
