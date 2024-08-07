import { RootState } from '@/app/store/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

// Get token from localStorage
const token = localStorage.getItem('adminToken');

const initialState: AdminAuthState = {
  isAuthenticated: !!token,
  token: token,
  error: null,
};

export const loginAdmin = createAsyncThunk< string, { email: string; password: string }, { state: RootState }>(
  'adminAuth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://strapi-backend-ddn2.onrender.com/admin/login', {
        // send post request to login 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log(data)
      localStorage.setItem('adminToken', data.jwt); // store jwt token in local storage
      return data.jwt;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
      console.log(state.token)
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, loginFailure, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
