import styles from './Headline.module.css';

export const Headline = ({ children }) => (
    <h1 className={styles.className}>
        {children}
    </h1>
)