import sendRequest from '../utils/request';
import {host} from './host';

export function getTasks(type) {
    return sendRequest(`${host}/api/tasks/${type}`, 'GET');
}