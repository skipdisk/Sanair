import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stationNotifications: [
    {
      stationName: "test station",
      stationID: "23433",
      status: "healthy",
      aqi: 30,
    },
  ],
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.stationNotifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      console.log(action);
      return state.stationNotifications.filter(
        (station) => station.stationID !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNotification, removeNotification } = globalSlice.actions;

export default globalSlice.reducer;
