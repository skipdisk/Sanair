export const pollutionLevel = (aqi) => {
  if (aqi < 100) {
    return { status: "healthy", color: "success" };
  }
  if (aqi >= 100 && aqi < 150) {
    return { status: "moderate", color: "primary" };
  }

  if (aqi >= 150) {
    return { status: "unhealthy", color: "danger" };
  }
};
