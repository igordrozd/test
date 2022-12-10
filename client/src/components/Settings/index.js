import React from 'react';
import { Button, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Logout } from '../Logout';


export const Settings = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return(
        <>
            <Modal title="Настройки"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
            >

                <Logout />

            </Modal>
            
            <Button onClick={showModal}>
                <SettingOutlined />
            </Button>
        </>
    );
}