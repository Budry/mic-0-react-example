/**
 * This file is part of the react package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import axios from 'axios';


export interface UsersOptions {
    query: string
    limit: number
    offset: number
    sortKey: string
    sortDirection: string
}

export interface Response {
    total: number
    items: {
        id: number
        name: string
        email: string
    }[]
}

const API_KEY = 'super_secret_api_key';
const URL = 'https://mic.erak.zaruba-ondrej.dev/users';

export const getUsers = async (options: Partial<UsersOptions>): Promise<Response> => {
    const response = await axios.get(URL, {
        params: {
            ...options,
            apiKey: API_KEY
        }
    });

    return response.data;
};