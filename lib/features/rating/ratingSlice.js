import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserRatings = createAsyncThunk("rating/fetchUserRatings",
    async ({ getToken }) => {
        try {
            const token = await getToken();
            const { data } = await axios.get("/api/rating", { headers: { Authorization: `Bearer ${token}` } });
            return data ? data.ratings : [];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        ratings: [],
    },
    reducers: {
        addRating: (state, action) => {
            state.ratings.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRatings.fulfilled, (state, action) => {
            state.ratings = action.payload
        });
    }
});

export const { addRating } = ratingSlice.actions;
export default ratingSlice.reducer;