import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

const initialState = {
    employee: [],
    isSuccess: false,
    message: "",
    loading: false,
};

export const getEmployee = createAsyncThunk("employee/getEmployee", (token) => {
    try {
        const data = axios.get(`${BASE_URL}/employees`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) { }
});

export const addEmployee = createAsyncThunk("employee/addEmployee", ({ token, formData }) => {
    try {
        const data = axios.post(`${BASE_URL}/employees`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });
        return data;
    } catch (error) { }
});


const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        currentEmployee: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [getEmployee.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getEmployee.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.employee = payload.data;
            state.isSuccess = true;
        },
        [getEmployee.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [addEmployee.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addEmployee.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.message = payload.data;
            state.isSuccess = true;
        },
        [addEmployee.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});


export const { currentEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
