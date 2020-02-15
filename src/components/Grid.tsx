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

export interface Sort {
    key: keyof Response['items'][0]
    direction: 'asc' | 'desc'
}

interface GridProps {
    items: Response['items']
    sort: Sort
    handleSortChange: (sort: Sort) => void
}

const Grid: FunctionComponent<GridProps> = ({ items, sort, handleSortChange}) => {

    const createSortHandler = (sort: Sort) => {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            handleSortChange(sort)
        }
    };

    const getNextDirection = (current: Sort['direction']): Sort['direction'] => {
        const map = ['asc', 'desc'];
        const index = map.indexOf(current);
        return map[(index + 1) % map.length] as any;
    };

    return (
        <table className="table table-bordered table-hover">
            <thead>
            <tr>
                <th><a href="#" onClick={createSortHandler({key: 'id', direction: sort.key === 'id' ? getNextDirection(sort.direction) : 'asc'})}>ID</a></th>
                <th><a href="#" onClick={createSortHandler({key: 'name', direction: sort.key === 'name' ? getNextDirection(sort.direction) : 'asc'})}>Jméno</a></th>
                <th><a href="#" onClick={createSortHandler({key: 'email', direction: sort.key === 'email' ? getNextDirection(sort.direction) : 'asc'})}>E-mail</a></th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}.</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default Grid;