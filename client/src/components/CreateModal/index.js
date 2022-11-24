import React, { useState } from "react"
import { Modal } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
export const CreateModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ state, setState ] = useState(true);

    const close = () => {
        setState(false);
        const newLocation = location.pathname.replace('/create', '');
        navigate(newLocation);
    }
    return(
        <Modal title="Создать элемент" open={state} onCancel={close}>
            dsfsdfds
        </Modal>
    );
}