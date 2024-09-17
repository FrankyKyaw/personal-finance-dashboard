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
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return response.json();
}

export const useTransactions = (accessToken: string) => {
    return useQuery<any, Error>(['transactions', accessToken], () => fetchTransactions(accessToken), {
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60, // 30 minutes
    });

}
