import sendRequest from '../utils/request';
import { host } from './host'

export function postTasks(data) {
    return sendRequest(`${host}/api/tasks`, 'POST', data);
}