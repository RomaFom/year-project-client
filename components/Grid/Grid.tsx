import React from 'react';
import styles from './Grid.module.scss';

interface Props {
    children: React.ReactNode;
}
const Grid: React.FC<Props> = ({ children }) => (
    <div className={styles.cardsGrid}>{children}</div>
);
export default Grid;
