import React, {Component} from 'react';
import styles from './Section.scss';
import {connect} from "react-redux";
import Card from "../Card/Card";
import {withRouter} from 'react-router-dom';

class Section extends Component {

    render() {
        let cardsArray = [];
        const {currentArray} = this.props.store;
        // обрезаем слишком длинные строки
        function sliceText(string, maxLength) {
            return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
        }

        for (let i = 0; i < currentArray.length; i++) {
            cardsArray.push(
                <Card
                    key={i}
                    file={currentArray[i].file}
                    cardTitle={sliceText(currentArray[i].inputTitle, 40)}
                    cardText={sliceText(currentArray[i].inputDescription, 150)}
                    type={sliceText(currentArray[i].type, 12)}
                    weight={currentArray[i].weight}
                />
            );
        }

        return(
            <section className={styles.section}>
                {cardsArray}
            </section>
        )
    }
}

export default withRouter(connect(
    state => ({
        store: state
    })
)(Section))
