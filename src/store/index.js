import { configureStore } from '@reduxjs/toolkit';
import app from '../slices/AppSlice';

const store = configureStore({
  reducer: { app },
});

export default store;
