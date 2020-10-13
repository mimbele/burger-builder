import React from 'react'
import styles from './Order.module.css'

const order = (props) => {
    return (
        <div className={styles.Order}>
            <p>ingredients: dummy data for now</p>
            <p>price: dummy data</p>
        </div>
    );
}

export default order;