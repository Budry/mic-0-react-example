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
import Grid, {Sort} from './Grid';
import Pagination from './Pagination';
import FilterForm, {FilterFormState} from './FilterForm';
import {getUsers, Response, UsersParams} from '../api';

const LIMIT = 5;

const App: FunctionComponent<{}> = () => {

    const [response, setResponse] = useState<Response>({total: 0, items: []});
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<Sort>({key: 'id', direction: 'desc'});
    const [filter, setFilter] = useState<FilterFormState>({column: 'email', query: ''});

    useEffect(() => {
        (async () => {
            const params: Partial<UsersParams> = {
                limit: LIMIT,
                offset: (page - 1) * LIMIT,
                sortKey: sort.key,
                sortDirection: sort.direction,
            };
            if (filter) {
                params.query = filter.query;
                params.queryColumn = filter.column
            }

            const result = await getUsers(params);
            setResponse(result);
        })();
    }, [page, sort, filter]);

    return (
        <div>
            <FilterForm
                onFilter={(value) => setFilter(value)}
                currentFilter={filter}
            />
            <Grid
                items={response.items}
                sort={sort}
                handleSortChange={(sort) => setSort(sort)}
            />
            <Pagination
                currentPage={page}
                totalItems={response.total}
                limit={LIMIT}
                onChangePage={(page) => setPage(page)}
            />
        </div>
    );
};

export default App;