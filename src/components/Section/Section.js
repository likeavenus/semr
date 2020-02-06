import React, {Component} from 'react';
import styles from './Section.scss';
import {connect} from 'react-redux';
import Card from "../Card/Card";

class Section extends Component {
    render() {
        const storeCards = this.props.store.cards;
        const cardsArray = [];
        let id = 0;
        for (let i of storeCards) {
            cardsArray.push(
                <Card
                    key={id}
                    file={i.file}
                    cardTitle={i.inputTitle}
                    cardText={i.inputDescription}
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
