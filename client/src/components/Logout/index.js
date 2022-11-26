import {Button} from "antd";
import React from "react";
import {useStore} from "../../App";


export const Logout = () => {
    const { authorize } = useStore();
    const logout = async() => {
        localStorage.removeItem('auth_token');
        await authorize();
    }
    return(
        <Button onClick={logout}>
            Выйти
        </Button>
    );
}