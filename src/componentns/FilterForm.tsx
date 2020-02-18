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
    currentQuery: string
    onChange: (query: string) => void
}

const FilterForm: FunctionComponent<FilterFormProps> = ({onChange, currentQuery}) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    };

    return (
        <form>
            <input type="text" value={currentQuery} onChange={onChangeHandler} />
        </form>
    );
};

export default FilterForm;