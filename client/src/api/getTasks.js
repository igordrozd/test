import sendRequest from '../utils/request';

export function getTasks() {
    return sendRequest(`http:localhost:${port}/api/tasks/:id`, 'GET');
}