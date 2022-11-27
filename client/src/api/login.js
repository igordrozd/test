import sendRequest from '../utils/request';
import {host} from './host';

export function login(data) {
    return sendRequest(`${host}/api/users/login`, 'POST', data);
}