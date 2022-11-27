
import React from "react";
import { 
    EditOutlined, 
    DeleteOutlined
} from '@ant-design/icons';
import { Button, Table, Space, notification, Popconfirm } from 'antd';
import { deleteTaskById } from '../../api/deleteTasks';



const mapping = {
    "event": "Событие",
    "operation": "Операция",
    "inform" : "Служебные данные ",
    "instruction" : "Инструкция"
}

const getType = type => mapping[type];

const deleteTask = async (record) => {
    const response = await deleteTaskById(record.id);
    const json = await response.json();
    return json;
}

const columns = (reload, editTask) => [
    {
        width: 50,
        title: `ID`,
        dataIndex: `id`
    },
    {
        width: 180,
        title: `Тип`,
        dataIndex: `type`,
        render: getType
    },
    {
        title: `Имя события/операции`,
        dataIndex: `title`,
    },
    {
        render: (_, record) => {
            console.log(record);
            const drop = async () => {
                await deleteTask(record);
                await reload();
                notification.success({
                    message: 'Запись успешно удалена',
                    description: `Запись "${record.title}" успешно удалена`
                });
            }
            const edit = () => {
                editTask(record);
            }
            return(
                <Space>
                    <Button size="small" onClick={edit}>
                        <EditOutlined />
                            </Button>
                        <Popconfirm 
                            title="Вы уверены, что хотите удалить?" 
                            onConfirm={drop}
                            okText="Да"
                            cancelText="Нет"
                        >
                        <Button size="small">
                                <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            );
        }
    }
]
export const TasksList = ({ reload, edit, tasks }) =>{
    return (
        <Table
            columns={columns(reload, edit)}
            dataSource={tasks}
        />
    )
}