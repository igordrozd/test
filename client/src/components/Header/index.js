import React from "react";
import { Button, Space, Avatar } from "antd";
//import { Link } from "react-router-dom";
import { useStore } from "../../App";
//import { Logout } from "../Logout";
import styles from './Header.module.css';
import { UserOutlined } from '@ant-design/icons';
import { Settings } from "../Settings";

export const Header = ({ children, document }) => {
    const { store } = useStore();
    return(
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.content}>
                    <div>
                        <Space>
{/* 
                            <Link to="/" className={styles.user}>
                                <Button>
                                    <LeftOutlined />
                                </Button>
                            </Link> */}
                            
                            <Avatar icon={<UserOutlined />} />

                            {store.user?.fullName}
                            
                            {document && (
                                <>
                                    &nbsp;/&nbsp;
                                    {document.title}
                                </>
                            )}
                        </Space>
                    </div>
                    <Space>
                        {/* <Logout /> */}
                        {children}
                        <Settings />
                    </Space>
                </div>
            </div>
        </div>
    );
}