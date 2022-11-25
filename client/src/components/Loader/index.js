import { Spin } from "antd";
import styles from './Loader.module.css';

export const Loader = () => {
    return(
        <div className={styles.wrapper}>
            <Spin
                spinning={true}
                size="large"
            />
        </div>
    );
}