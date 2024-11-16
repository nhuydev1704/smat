import AxiosClient from '@/apis/AxiosClient';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
    id: number;
    title: string;
}

interface CustomerState {
    customers: Customer[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    customers: [],
    loading: true,
    error: null,
};

// Thunks
export const fetchCustomer = createAsyncThunk('customer/fetchCustomers', async () => {
    const response = await AxiosClient.get('/issues');
    return response.data;
});

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex((customer) => customer.id === action.payload.id);
            if (index !== -1) state.customers[index] = action.payload;
        },
        deleteCustomer: (state, action: PayloadAction<number>) => {
            state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomer.fulfilled, (state, action: PayloadAction<Customer[]>) => {
                state.customers = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomer.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch customers';
                state.loading = false;
            });
    },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
