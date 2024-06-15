import { RootState } from '@/app/store/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AdminAuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

export const loginAdmin = createAsyncThunk<
  void,
  { email: string; password: string },
  { state: RootState }
>(
  'adminAuth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:1337/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });
      console.log(response)
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.jwt);
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
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload as unknown as string;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, loginFailure } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
