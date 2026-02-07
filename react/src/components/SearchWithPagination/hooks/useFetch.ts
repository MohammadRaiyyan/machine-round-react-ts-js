import { useEffect, useState } from 'react';

function useFetch<T>(queryFn: () => Promise<T>) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;
        setIsPending(true);
        queryFn().then(data => {
            if (isMounted) {
                setData(data)
            }
        }).catch(e => {
            if (isMounted) {
                setError(e instanceof Error ? e.message : "Something went wrong")
            }
        }).finally(() => {
            if (isMounted)
                setIsPending(false)
        });

        return () => {
            isMounted = false;
        }

    }, [queryFn]);

    return {
        isPending,
        error,
        data
    }
}

export default useFetch