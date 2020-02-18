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
import classnames from 'classnames';

interface PaginationProps {
    limit: number
    total: number
    currentPage: number
    onPageChange: (page: number) => void
}

const Pagination: FunctionComponent<PaginationProps> = ({limit, total, onPageChange, currentPage}) => {

    const pages = [];
    for (let page = 1; page <= Math.ceil(total / limit); page++) {
        pages.push(page);
    }

    const createClickHandler = (page: number) => {
        return (e: React.MouseEvent) => {
            onPageChange(page)
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li className={classnames('page-item', {active: currentPage === page})} key={page}>
                            <a className="page-link" href="#" onClick={createClickHandler(page)}>
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