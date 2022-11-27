import React from "react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import { useStore } from "../../App";
import { Logout } from "../Logout";
import styles from './Header.module.css';

export const Header = ({ children, document }) => {
    const { store } = useStore();
    return(
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.content}>
                    <div>
                        <Link to="/" className={styles.user}>
                            {store.user?.name}
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