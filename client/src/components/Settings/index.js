import React from 'react';
import { Button, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";


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
                <p>
                    Смена темы:
                </p>
            </Modal>
            <Button onClick={showModal}>
                <SettingOutlined />
            </Button>
        </>
    );
}