import sendRequest from '../utils/request';

export function putTasks(data,id) {
    return sendRequest(`/api/tasks/${id}`, 'PUT', data);
}