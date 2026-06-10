export const calculateFare = (
    distance,
    vehicleType,
    isRain,
    hour
) => {

    const rate =
        vehicleType === "bike"
            ? 5
            : 8;

    const baseFare = distance * rate;

    const platformCharge =
        baseFare * 0.30;

    const rainCharge =
        vehicleType === "car" && isRain
            ? 79
            : 0;

    const nightCharge =
        hour >= 22
            ? 49
            : 0;

    const totalFare =
        baseFare +
        platformCharge +
        rainCharge +
        nightCharge;

    return {
        baseFare,
        platformCharge,
        rainCharge,
        nightCharge,
        totalFare
    };
};