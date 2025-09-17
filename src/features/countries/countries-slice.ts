import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<
    { data: Country[] },
    undefined,
    {
        state: {
            countries: CountrySlice,
        }
        extra: Extra,
        rejectValue: string,
    }
>(
    '@@countries/load-countries',
    async (
        _,
        {
            extra: { client, api },
            rejectWithValue,
        }
    ) => {
        try {
            return client.get(api.ALL_COUNTRIES)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Unknown error.')
            }
        }
    },
    {
        condition: (_, {getState}) => {
            const { countries: { status } } = getState();

            if (status === 'loading') {
                return false;
            }
        }
    }
);

type CountrySlice = {
    list: Country[],
    error: string | null,
    status: Status,
}

const initialState: CountrySlice = {
    list: [],
    error: null,
    status: 'idle',
}

const countrySlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'Cannot load data';
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload.data;
            })
    }
})

export const countryReducer = countrySlice.reducer;
