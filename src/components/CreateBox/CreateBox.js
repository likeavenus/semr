import React, {Component} from 'react';
import styles from './CreateBox.scss';

export default class CreateBox extends Component {
    render() {
        return (
            <section className={styles.create_box}>
                <div className={styles.create_content}>
                    <h1 className={styles.create_title}>Webinars</h1>
                    <p className={styles.create_text}>Here you can register and take part in educational webinars conducted by the best digital marketing experts</p>

                    <button className={styles.create_btn} type={'button'}>Add new</button>
                </div>

            </section>
        );
    }
}

