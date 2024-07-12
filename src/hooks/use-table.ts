import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from './use-debounce';

const useTable = (defaultPage = 0, defaultRowsPerPage = 10) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo(() => {
        return new URLSearchParams(searchParams.toString());
    }, [searchParams]);
    const [page, setPage] = useState(Number(params.get('p')) || defaultPage);
    const [rowsPerPage, setRowsPerPage] = useState(Number(params.get('l')) || defaultRowsPerPage);

    const handleSortChange = (sort: { item: string; dir: string }) => {
        params.set('orderby', sort.item);
        params.set('order', sort.dir);
        setSearchParams(params);
    };

    const orderBy = params.get('orderby');
    const order = params.get('order');

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        params.set('p', newPage.toString());
        setSearchParams(params);
    };

    const search = params.has('search') ? params.get('search') : '';
    const debouncedSearchTerm = useDebounce(search ?? '', 500);
    useEffect(() => {
        setPage(0);
        params.set('p', '0');
        setSearchParams(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        params.set('p', '0');
        params.set('l', newRowsPerPage.toString());
        setSearchParams(params);
    };

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        orderBy,
        order,
        debouncedSearchTerm,
        handleSortChange,
        handleChangePage,
        handleChangeRowsPerPage
    };
};

export default useTable;
