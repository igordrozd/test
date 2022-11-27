import sendRequest from '../utils/request';
import { host } from './host';

export function deleteTaskById(id) {
    return sendRequest(`${host}/api/tasks/${id}`, 'DELETE');
}