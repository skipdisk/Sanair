import { collection, doc, setDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "config/fbconfig";

export const createStation = ({
  stationID,
  aqi,
  latitude,
  longitude,
  stationName,
  lastUpdated,
}) => {
  const stationRef = doc(db, "stations", `${stationID}`);

  const addObject = {
    stationID,
    aqi,
    latitude,
    longitude,
    stationName,
    lastUpdated,
  };

  setDoc(stationRef, { ...addObject });
};

export const createOrUpdateStation = async ({
  station: { title, stationID, status },
  user,
}) => {
  const userRef = doc(db, `users`, user.uid);

  const updateObject = {
    selectedStations: [...user.selectedStations, { title, stationID, status }],
  };

  await updateDoc(userRef, updateObject);

  return updateObject.selectedStations;
};

export const getUserData = async () => {
  const userRef = doc(db, `users`, auth.currentUser.uid);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();

  return data;
};

export const getStationsData = async () => {
  const stations = {};
  const querySnapshot = await getDocs(collection(db, "stations"));
  querySnapshot.forEach((station) => {
    stations[station.id] = { ...station.data() };
  });
  return stations;
};
