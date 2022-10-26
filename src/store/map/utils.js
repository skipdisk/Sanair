export const sanitizeMarker = (marker) => {
  const {
    aqi,
    uid,
    station: {
      geo: [latitude, longitude],
      name,
    },
    time: { stime },
    title,
  } = marker;

  return {
    title: title,
    stationID: uid,
    stationName: name || "",
    aqi,
    lastUpdated: stime,
    latitude,
    longitude,
  };
};
