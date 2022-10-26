import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stations: {},
};

export const mapSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addMarker: (state, action) => {
      const selectedMarker = action.payload;
      state.markers.push(selectedMarker);
    },
    addStations: (state, action) => {
      state.stations = { ...state.stations, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMarker, addStations } = mapSlice.actions;

export default mapSlice.reducer;
