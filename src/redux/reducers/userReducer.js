import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

const initialState = {
    user_data: [],
    status: '',
    message: "",
    loading: false,
};

export const userRegister = createAsyncThunk("store/userRegister", (formData) => {
    try {
        const data = axios.post(BASE_URL + "/register", formData);
        return data;
    } catch (error) { }
});

export const userLogin = createAsyncThunk("store/userLogin", (formData) => {
    try {
        const data = axios.post(BASE_URL + "/login", formData);
        return data;
    } catch (error) { }
});

export const logoutUser = createAsyncThunk("store/logoutUser", () => {
    try {
        const data = null;
        return data;
    } catch (error) { }
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authUser: (state, action) => {
            state.user = action.payload
        },
    }, extraReducers: {
        [userRegister.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [userRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload.data;
            state.status = 'fulfilled';
        },
        [userRegister.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.status = 'rejected';
        },
        [userLogin.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = payload.data;
            state.status = 'fulfilled';
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.status = 'rejected';
        },
        [logoutUser.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [logoutUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user_data = null;
            state.status = 'fulfilled';
        },
        [logoutUser.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.status = 'rejected';
        },
    },
});


export const { authUser } = userSlice.actions;

export default userSlice.reducer;
