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

interface FilterFormProps {
    currentFilter: FilterFormState
    onFilter: (filter: FilterFormState) => void;
}

export interface FilterFormState {
    column: string
    query: string
}

const FilterForm: FunctionComponent<FilterFormProps> = ({onFilter, currentFilter}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onFilter({
            ...currentFilter,
            [e.target.name]: e.target.value
        })
    };

    return (
        <form>
            <select onChange={handleChange} name="column" value={currentFilter.column}>
                <option value="name">Jméno</option>
                <option value="email">Email</option>
            </select>
            <input type="search" onChange={handleChange} name="query" value={currentFilter.query} />
        </form>
    );
};

export default FilterForm;