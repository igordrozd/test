import sendRequest from '../utils/request';
import {host} from './host';

export function register(data) {
    return sendRequest(`${host}/api/users/register`, 'POST', data);
}