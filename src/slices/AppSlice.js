import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  distance: '',
  averageFuelConsumption: '',
  price: '',
  result: '',
  quantityPersons: '',
  pricePerPerson: '',
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    onClear: () => initialState,
    onInputHandler: (state, action) => {
      switch (action.payload.name) {
        case 'distance':
          state.distance = action.payload.value;
          break;
        case 'average':
          state.averageFuelConsumption = action.payload.value;
          break;
        case 'price':
          state.price = action.payload.value;
          break;
        case 'quantityPersons':
          state.quantityPersons = action.payload.value;
          break;
        default:
      }
    },
    totalPrice: (state) => {
      state.result =
        (state.averageFuelConsumption / 100) * state.distance * state.price;
    },
    pricePerPassenger: (state) => {
      state.pricePerPerson = state.result / state.quantityPersons;
    },
  },
});

export const { onClear, onInputHandler, totalPrice, pricePerPassenger } =
  AppSlice.actions;

export default AppSlice.reducer;
