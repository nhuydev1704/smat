import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
    Customer,
    addCustomer as addCustomerAction,
    updateCustomer as updateCustomerAction,
    deleteCustomer as deleteCustomerAction,
} from './Customer.Slice';
import AxiosClient from '@/apis/AxiosClient';

export const useFetchCustomers = (): UseQueryResult<Customer[], Error> =>
    useQuery({
        queryKey: ['customer'],
        queryFn: async (): Promise<Customer[]> => {
            const response = await AxiosClient.get('/issues');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes (default: 0)
        refetchOnWindowFocus: true, // Refetch on focus (default: true)
    });

export const useAddCustomer = (): UseMutationResult<Customer, Error, { title: string }> => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async (newCustomer: { title: string }): Promise<Customer> => {
            const response = await AxiosClient.post('/issues', newCustomer);
            return response.data;
        },
        // This will only be called if the mutation is successful,
        // different with onSettled with will be called regardless of whether the mutation was successful or not
        onSuccess: (data) => {
            // Invalidate cache, refresh items after creating
            queryClient.invalidateQueries({ queryKey: ['customer'] });
            dispatch(addCustomerAction(data));
        },
    });
};

export const useUpdateCustomer = (): UseMutationResult<Customer, Error, { id: number; title: string }> => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async (updatedCustomer: { id: number; title: string }): Promise<Customer> => {
            const response = await AxiosClient.put(`/issues/${updatedCustomer.id}`, updatedCustomer);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });
            dispatch(updateCustomerAction(data));
        },
    });
};

export const useDeleteCustomer = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async (id: number): Promise<void> => {
            await AxiosClient.delete(`/issues/${id}`);
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });
            dispatch(deleteCustomerAction(id));
        },
    });
};
