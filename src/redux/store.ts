import { configureStore } from '@reduxjs/toolkit';
import absencesReducer from './features/absences/slice';
import conflictsReducer from './features/conflicts/slice';

export const store = configureStore({
  reducer: {
    absences: absencesReducer,
    conflicts: conflictsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
