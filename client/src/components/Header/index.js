import React, { useState } from "react";
import { Button, Space, Modal } from "antd";
import { SettingOutlined }from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useStore } from "../../App";
import { Logout } from "../Logout";
import styles from './Header.module.css';
//import { Preview } from '../../pages/Editor/Preview'

export const Header = ({ children, document }) => {
    const { store } = useStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.content}>
                    <div>
                        <Space>
                            <Button onClick={showModal}>
                                <SettingOutlined />
                            </Button>
                            <Modal title="Настройки" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <p>
                                    Смена темы:
                                </p>
                                <Button></Button>
                            </Modal>
                            
                            <Link to="/" className={styles.user}>
                                {store.user?.fullName}
                            </Link>
                            {document && (
                                <>
                                    &nbsp;/&nbsp;
                                    {document.title}
                                </>
                            )}
                        </Space>
                    </div>

                    <Space>
                        <Logout />
                        {children}
                    </Space>
                </div>
            </div>
        </div>
    );
}