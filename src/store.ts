import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import * as api from 'config';
import { themeReducer } from 'features/theme/theme-slice';
import { controlsReducer } from 'features/controls/controls-slice';
import { countryReducer } from 'features/countries/countries-slice';
import { detailsReducer } from 'features/details/details-slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    details: detailsReducer,
    controls: controlsReducer,
    countries: countryReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        client: axios,
      },
    },
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;