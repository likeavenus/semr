import React, {Component} from 'react';
import styles from './Card.scss';

export default class Card extends Component {
    render() {
        let cardStyles = styles.card;

        let cardStyleBackground = {};

        let imageBox =
            <div className={styles.card_image_box}>
                <img className={styles.card_image} src={this.props.file} alt="some img"/>
            </div>;

        if (this.props.type.toLowerCase() === 'big') {
            cardStyles += ` ${styles.big}`;
            imageBox = null;
            cardStyleBackground = {
                backgroundImage: 'url(' + this.props.file + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        }
        return (
            <a href={'/'} className={cardStyles} style={cardStyleBackground}>
                {imageBox}
                <div className={styles.card_info}>
                    <h3 className={styles.card_title}>{this.props.cardTitle}</h3>
                    <p className={styles.card_text}>{this.props.cardText}</p>
                </div>
                {this.props.type === '' || this.props.type.toLowerCase() === 'big' ? null : <span className={styles.card_type}>{this.props.type}</span>}
            </a>
        );
    }
}
