import { createSlice } from "@reduxjs/toolkit";

export interface ScoreState {
  value: number;
}

const initialState: ScoreState = {
  value: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setScore } = scoreSlice.actions;

export default scoreSlice.reducer;
