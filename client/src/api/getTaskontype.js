import sendRequest from '../utils/request';
import {port} from './port';

export function getTasks(type) {
    return sendRequest(`http://localhost:${port}/api/tasks/${type}`, 'GET');
}