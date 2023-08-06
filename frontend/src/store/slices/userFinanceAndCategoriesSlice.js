import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserCategoriesAPI,
  getUserFinanceAPI,
  addFinanceAPI,
  addCategoryAPI,
  deleteFinanceAPI,
  deleteCategoryAPI,
} from '../../utils/api';

export const getUserCategories = createAsyncThunk(
  'userFinanceAndCategories/getUserCategories',
  async () => {
    return getUserCategoriesAPI();
  },
);

export const getUserFinance = createAsyncThunk(
  'userFinanceAndCategories/getUserFinance',
  async () => {
    return getUserFinanceAPI();
  },
);

export const addFinance = createAsyncThunk(
  'userFinanceAndCategories/addFinance',
  async (formData) => {
    return addFinanceAPI(formData);
  },
);

export const deleteFinance = createAsyncThunk(
  'userFinanceAndCategories/deleteFinance',
  async (id) => {
    return deleteFinanceAPI(id);
  },
);

export const addCategory = createAsyncThunk(
  'userFinanceAndCategories/addCategory',
  async (formData) => {
    return addCategoryAPI(formData);
  },
);

export const deleteCategory = createAsyncThunk(
  'userFinanceAndCategories/deleteCategory',
  async (id) => {
    return deleteCategoryAPI(id);
  },
);

const initialState = {
  userCategories: [],
  userFinance: [],
  loading: false,
  error: null,
};

export const userFinanceAndCategoriesSlice = createSlice({
  name: 'userFinanceAndCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.userCategories = action.payload.results;
      })
      .addCase(getUserCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFinance.fulfilled, (state, action) => {
        state.loading = false;
        state.userFinance = action.payload.results;
      })
      .addCase(getUserFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFinance.fulfilled, (state, action) => {
        state.loading = false;

        state.userFinance.push(action.payload);
      })
      .addCase(addFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFinance.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.userCategories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userFinanceAndCategoriesReducer = userFinanceAndCategoriesSlice.reducer;
