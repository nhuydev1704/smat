import { useSearchParams } from 'react-router-dom';

export function useRouter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObject = Object.fromEntries(searchParams);

    return {
        searchParams: searchParamsObject,
        setSearchParams,
    } as {
        searchParams: Record<string, any>;
        setSearchParams: (params: Record<string, any>) => void;
    };
}
