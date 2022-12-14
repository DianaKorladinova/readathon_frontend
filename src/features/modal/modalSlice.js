import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login, register} from "./modalAPI";

const initialState = {
    open: false,
    loginError: false,
};


export const loginUser = createAsyncThunk(
    'modal/login',
    async (user, thunkAPI) => {
        const result = await login(user)
        let {success} = result
        if (success) {
            return result.response
        }
        return thunkAPI.rejectWithValue(result.err)
    });

export const registerUser = createAsyncThunk(
    'modal/register',
    async (user, thunkAPI) => {
        const result = await register(user)
        let {success} = result
        if (success) {
            return result.response
        }
        return thunkAPI.rejectWithValue(result.err)
    });

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state) {
            state.open = true
        },
        closeModal(state) {
            state.open = false
        },
        logOff(state) {
            localStorage.removeItem('token');
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                const {token} = action.payload
                state.token = token
                state.open = false
                localStorage.setItem('token', token);
                state.loginError= false
            }).addCase(loginUser.rejected, (state, action) => {
            state.loginError = action.payload.message
            console.log(action.payload.message);
        }).addCase(registerUser.fulfilled, (state, action) => {
            const {token} = action.payload
            state.token = token
            state.open = false
            localStorage.setItem('token', token);
            state.loginError= false
        }).addCase(registerUser.rejected, (state, action) => {
            state.loginError = action.payload.message
        })
        ;
    },
});

export const {openModal, closeModal, logOff} = modalSlice.actions

export default modalSlice.reducer;
