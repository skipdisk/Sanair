import { configureStore } from "@reduxjs/toolkit";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import mapSlice from "store/map/slice";
import globalSlice from "store/global/slice";
import userDataSlice from "store/userData/slice";

import "firebase/database";

export const store = configureStore({
  reducer: {
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    userData: userDataSlice,
    global: globalSlice,
    map: mapSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});
