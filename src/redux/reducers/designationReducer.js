import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

const initialState = {
    designations: [],
    isSuccess: false,
    error: "",
    message: "",
    loading: false,
};

export const getDesignation = createAsyncThunk("designation/getDesignation", (token) => {
    try {
        const data = axios.get(`${BASE_URL}/designations`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) { }
});

export const addDesignation = createAsyncThunk("designation/addDesignation", ({ token, formData }) => {
    try {
        const data = axios.post(`${BASE_URL}/designations`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        return data;
    } catch (error) { }
});

export const editDesignation = createAsyncThunk("designation/editDesignation", ({ token, id, formData }) => {
    try {
        const data = axios.put(`${BASE_URL}/designations/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) { }
});

export const deleteDesignation = createAsyncThunk("designation/deleteDesignation", ({ token, id }) => {
    try {
        const data = axios.delete(`${BASE_URL}/designations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) { }
});

const designationSlice = createSlice({
    name: "designation",
    initialState: initialState,
    reducers: {
        currentDesignation: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [getDesignation.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getDesignation.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.designations = payload.data;
            state.isSuccess = true;
        },
        [getDesignation.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [addDesignation.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addDesignation.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.message = payload.data;
            state.isSuccess = true;
        },
        [addDesignation.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});


export const { currentDesignation } = designationSlice.actions;

export default designationSlice.reducer;
