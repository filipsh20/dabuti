import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = slice.actions;
export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value;

const counterReducer = slice.reducer;

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
