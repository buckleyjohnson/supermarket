import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';   

interface AuthState {
    token: string | null;
    roles: string[];
}

interface JWTPayload { roles: string[] }  

const tokenFromStorage = localStorage.getItem('token');

const initialState: AuthState = {
  token: tokenFromStorage,
  roles: tokenFromStorage
    ? jwtDecode<JWTPayload>(tokenFromStorage).roles   // ← decode once
    : [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            // roles may come from UI decode
            localStorage.setItem('token', action.payload);
        },
        setRoles(state, action: PayloadAction<string[]>) {
            state.roles = action.payload;
        },
        logout(state) {
            state.token = null;
            state.roles = [];
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, setRoles, logout } = authSlice.actions;
export default authSlice.reducer;
