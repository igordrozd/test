import sendRequest from '../utils/request';

export async function verifyToken() {
    const response = await sendRequest(`/api/users/verify`, 'POST');
    const json = await response.json();
    return json;
}