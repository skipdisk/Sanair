import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  selectedStations: [],
};

export const userDataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => ({ ...action.payload }),
    setStations: (state, action) => {
      state.selectedStations = [...action.payload];
    },
  },
});

export const { setUser, setStations } = userDataSlice.actions;

export default userDataSlice.reducer;
