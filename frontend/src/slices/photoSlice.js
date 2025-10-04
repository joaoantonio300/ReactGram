import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../slices/photoSlice";
import { resetMessage } from "../slices/userSlice";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};


/// Publish an user photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async(photo, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token);

        // Check for erros
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

    }
)

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
});

export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;
