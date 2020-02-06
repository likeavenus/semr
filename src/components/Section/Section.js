import React, {Component} from 'react';
import styles from './Section.scss';
import {connect} from 'react-redux';
import Card from "../Card/Card";

class Section extends Component {
    render() {
        const storeCards = this.props.store.cards;
        const cardsArray = [];

        function sliceText(string, maxLength) {
            return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
        }
        let id = 0;
        for (let i of storeCards) {

            cardsArray.push(
                <Card
                    key={id}
                    file={i.file}
                    cardTitle={sliceText(i.inputTitle, 40)}
                    cardText={sliceText(i.inputDescription, 150)}
                    type={sliceText(i.type, 12)}
                />
            );
            id += 1;
        }

        return(
            <section className={styles.section}>
                {cardsArray}
            </section>
        )
    }
}

export default connect(
    state => ({
        store: state
    }))
(Section);
