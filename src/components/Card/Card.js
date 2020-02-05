import React, {Component} from 'react';
import styles from './Card.scss';
import someImg from './img/pic.jpg';

export default class Card extends Component {
    render() {
        return (
            <div className={styles.card}>
                <div className={styles.card_image_box}>
                    <img className={styles.card_image} src={someImg} alt="some img"/>
                </div>
                <div className={styles.card_info}>
                    <h3 className={styles.card_title}>{this.props.cardTitle}</h3>
                    <p className={styles.card_text}>{this.props.cardText}</p>
                </div>
            </div>
        );
    }
}