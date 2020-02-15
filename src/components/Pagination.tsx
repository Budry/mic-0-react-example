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
import classNames from 'classnames';

interface PaginationProps {
    currentPage: number
    limit: number
    totalItems: number
    onChangePage: (page: number) => void
}

const Pagination: FunctionComponent<PaginationProps> = ({onChangePage, limit, currentPage, totalItems}) => {

    const pages= [];
    for (let page = 1; page <= Math.ceil(totalItems / limit); page++) {
        pages.push(page);
    }

    const createPageHandler = (page: number) => {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            onChangePage(page);
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li className={classNames("page-item", {'active': page === currentPage})}>
                            <a className="page-link" href="#" onClick={createPageHandler(page)}>
                                {page}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Pagination;