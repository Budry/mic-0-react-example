/**
 * This file is part of the react package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import Table, {TablePros} from './Table';
import {getUsers, Response} from '../api';
import Pagination from './Pagination';
import FilterForm from './FilterForm';

const LIMIT = 5;

const App: FunctionComponent<{}> = () => {

    const [response, setResponse] = useState<Response>({total: 0, items: []});
    const [page, setPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState<string>("");
    const [sort, setSort] = useState<TablePros['currentSort']>({
        key: 'id',
        direction: 'asc'
    });

    useEffect(() => {
        (async () => {
            const response = await getUsers({
                limit: LIMIT,
                offset: (page - 1) * LIMIT,
                query: filterQuery,
                sortKey: sort.key,
                sortDirection: sort.direction
            });
            setResponse(response);
        })();
    }, [page, filterQuery, sort]);

    return (
        <div>
            <FilterForm
                currentQuery={filterQuery}
                onChange={(query) => setFilterQuery(query)}
            />
            <Table
                items={response.items}
                currentSort={sort}
                onSort={(newSort) => setSort(newSort)}
            />
            <Pagination
                limit={LIMIT}
                total={response.total}
                onPageChange={(newPage) => setPage(newPage)}
                currentPage={page}
            />
        </div>
    );
};

export default App;