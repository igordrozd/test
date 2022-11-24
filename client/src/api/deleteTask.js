import sendRequest from '../utils/request';
import { port } from './port';

export function deleteTaskById(id) {
    return sendRequest(`http://localhost:${port}/api/tasks/${id}`, 'DELETE');
}