import React, { useEffect, useState } from "react"
import { Form, Modal, notification, Select } from 'antd';
import { putDocuments } from "../../api/putDocuments";
import { postDocuments } from "../../api/postDocument";

const createTask = async (data) => {
    let response;
    const { time } = data;
    let start, end;
    if(Array.isArray(time)) {
        ([ start, end ] = time);
    } else {
        start = time;
    }
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : start;
    const body = {
        ...data,
        end: endTime,
        start: startTime,
    }
    if(data.id) {
        response = await putDocuments(body, data.id);
    } else {
        response = await postDocuments(body);
    }
    if(response.ok) {
        const json = await response.json();
        notification.success({
            message: `Запись ${data.id ? `изменена` : `добавлена`}`,
            description: `Запись "${json.title}" успешно ${data.id ? `изменена` : `добавлена`}`,
            duration: 1.5
        });
        return json;
    }
}
