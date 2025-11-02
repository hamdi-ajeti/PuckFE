import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    username: string;
    email: string;
}


interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}


const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ user: User, token: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('auth_token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth_token');
        }
    }
});


export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;