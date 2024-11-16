import customerReducer from '@/features/admin/customer/services/Customer.Slice';
import { configureStore } from '@reduxjs/toolkit';

const reduxStore = configureStore({
    reducer: {
        customer: customerReducer,
    },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export default reduxStore;
