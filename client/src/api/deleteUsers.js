import sendRequest from '../utils/request';

export function deleteUsers() {
    return sendRequest(`http:localhost:${port}/api/tasks/:id`, 'DELETE');
}