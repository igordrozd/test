import sendRequest from '../utils/request';
import {port} from './port';

export function postIcon(data) {
    return sendRequest(`http://localhost:${port}/api/icon`, 'POST', data);
}