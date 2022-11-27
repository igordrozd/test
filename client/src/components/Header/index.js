import React from "react";
import { Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useStore } from "../../App";
import { Logout } from "../Logout";
import styles from './Header.module.css';
import { UserOutlined } from '@ant-design/icons';

export const Header = ({ children, document }) => {
    const { store } = useStore();
    return(
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.content}>
                    <div>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <Link to="/" className={styles.user}>
                            {store.user?.fullName}
                        </Link>
                        {document && (
                            <>
                                &nbsp;/&nbsp;
                                {document.title}
                            </>
                        )}
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