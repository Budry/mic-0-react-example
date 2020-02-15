/**
 * This file is part of the react package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import axios from 'axios';

export interface Response {
    total: number,
    items: {
        id: number
        name: string
        email: string
    }[]
}

export interface UsersParams {
    query: string
    queryColumn: string
    sortKey: string
    sortDirection: string
    limit: number
    offset: number
}

const API_KEY = 'super_secret_api_key';

export const getUsers = async (params: Partial<UsersParams>) => {
    const result = await axios.get<Response>('https://mic.erak.zaruba-ondrej.dev/users', {
        params: {
            ...params,
            apiKey: API_KEY
        }
    });

    return result.data;
};