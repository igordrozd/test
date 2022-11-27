import sendRequest from '../utils/request';
import {host} from './host';

export function getTasks(id) {
    return sendRequest(`${host}/api/tasks/${id}`, 'GET');
}