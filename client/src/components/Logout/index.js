import { Button, Popconfirm } from "antd";
import React from "react";
import { useStore } from "../../App";


export const Logout = () => {
    const { authorize } = useStore();
    const logout = async() => {
        localStorage.removeItem('auth_token');
        await authorize();
    }
    return(
        <Popconfirm 
        title="Вы уверены, что хотите выйти из аккаунта?" 
        onConfirm={logout}
        okText="Да"
        cancelText="Нет"
        >
            <Button>
                Выйти из аккаунта
            </Button>
        </Popconfirm>
    );
}