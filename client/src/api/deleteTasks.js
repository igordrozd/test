import sendRequest from '../utils/request';

export function deleteTaskById(id) {
    return sendRequest(`/api/tasks/${id}`, 'DELETE');
}