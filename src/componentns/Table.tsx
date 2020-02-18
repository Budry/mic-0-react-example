/**
 * This file is part of the react package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react';
import {FunctionComponent} from 'react';
import {Response} from '../api';

export interface TablePros {
    items: Response['items']
    currentSort: {
        key: keyof Response['items'][0],
        direction: 'asc' | 'desc'
    }
    onSort: (sort: TablePros['currentSort']) => void
}

const Table: FunctionComponent<TablePros> = ({items, currentSort, onSort}) => {

    const createSortHandler = (sort: TablePros['currentSort']) => {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            onSort(sort);
        };
    };

    const createNextSort = (key: TablePros['currentSort']['key'], currentSort: TablePros['currentSort']): TablePros['currentSort'] => {
        const directions: TablePros['currentSort']['direction'][] = ['asc', 'desc'];
        const nextDirection = directions[(directions.indexOf(currentSort.direction) + 1) % directions.length];
        return {
            key: key,
            direction: key === currentSort.key ? nextDirection : directions[0]
        }
    };

    return (
        <table className="table">
            <thead>
            <tr>
                <th>
                    <a href="#" onClick={createSortHandler(createNextSort('id', currentSort))}>
                        ID
                    </a>
                </th>
                <th>
                    <a href="#" onClick={createSortHandler(createNextSort('name', currentSort))}>
                        Name
                    </a>
                </th>
                <th>
                    <a href="#" onClick={createSortHandler(createNextSort('email', currentSort))}>
                        Email
                    </a>
                </th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default Table;