import sendRequest from '../utils/request';
import { port } from './port'

export function putTasks(data,id) {
    return sendRequest(`http://localhost:${port}/api/tasks/${id}`, 'PUT', data);
}