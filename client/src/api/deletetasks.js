import sendRequest from '../utils/request';

export function deleteTasks() {
    return sendRequest(`http:localhost:${port}/api/tasks/:id`, 'DELETE');
}