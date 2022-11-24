import sendRequest from '../utils/request';

export function getTasks() {
    return sendRequest(`http:localhost:8000/api/tasks/:id`, 'GET');
}