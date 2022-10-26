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
      console.log(action);
      state.selectedStations = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setStations } = userDataSlice.actions;

export default userDataSlice.reducer;
