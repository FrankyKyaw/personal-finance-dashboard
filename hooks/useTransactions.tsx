import { useQuery } from "react-query";

const fetchTransactions = async (accessToken: string) => {
    const response = await fetch('/api/plaid/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
    })
    
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    return response.json();
}

export const useTransactions = (accessToken: string) => {
    return useQuery(['transactions', accessToken], () => fetchTransactions(accessToken), {
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60, // 30 minutes
    });

}