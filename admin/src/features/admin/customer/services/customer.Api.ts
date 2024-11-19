import AxiosClient from '@/apis/AxiosClient';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { Customer } from './customer.Zustand';

export const useFetchCustomers = (query: any): UseQueryResult<{ data: Customer[]; total: number }, Error> =>
    useQuery({
        queryKey: ['customer', query],
        queryFn: async (): Promise<{ data: Customer[]; total: number }> => {
            const response = await AxiosClient.get('/issues', {
                params: {
                    ...query,
                    limit: 12,
                    pageSize: 12,
                },
            });
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes (default: 0)
        refetchOnWindowFocus: true, // Refetch on focus (default: true)
    });

export const useAddCustomer = (): UseMutationResult<Customer, Error, { title: string }> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newCustomer: { title: string }): Promise<Customer> => {
            const response = await AxiosClient.post('/issues', newCustomer);
            return response.data;
        },
        // This will only be called if the mutation is successful,
        // different with onSettled with will be called regardless of whether the mutation was successful or not
        onSuccess: (data) => {
            if (data) {
                // Invalidate cache, refresh items after creating
                queryClient.invalidateQueries({ queryKey: ['customer'] });
            }
        },
    });
};

export const useUpdateCustomer = (): UseMutationResult<Customer, Error, { id: number; title: string }> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedCustomer: { id: number; title: string }): Promise<Customer> => {
            const response = await AxiosClient.put(`/issues/${updatedCustomer.id}`, updatedCustomer);
            return response.data;
        },
        onSuccess: (data) => {
            if (data) {
                // Invalidate cache, refresh items after creating
                queryClient.invalidateQueries({ queryKey: ['customer'] });
            }
        },
    });
};

export const useDeleteCustomer = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number): Promise<void> => {
            await AxiosClient.delete(`/issues/${id}`);
        },
        onSuccess: () => {
            // Invalidate cache, refresh items after creating
            queryClient.invalidateQueries({ queryKey: ['customer'] });
        },
    });
};
