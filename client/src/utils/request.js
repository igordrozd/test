import { notification } from 'antd';

export default async function(address, method, body) {
    const response = await fetch(address, {
        method,
        headers: {
            'Content-type': 'application/json',
            'token': localStorage.getItem('auth_token')
        },
        body: JSON.stringify(body)
    });
    if(response.ok) {
        return response;
    }
    const { message } = await response.json();
    notification.error({
        message: 'Произошла ошибка',
        description: message
    });
}

