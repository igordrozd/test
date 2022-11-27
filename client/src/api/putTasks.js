import sendRequest from '../utils/request';
import { host } from './host'

export function putTasks(data,id) {
    return sendRequest(`${host}/api/tasks/${id}`, 'PUT', data);
}