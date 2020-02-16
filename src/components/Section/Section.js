import React, {Component} from 'react';
import styles from './Section.scss';
import {connect} from "react-redux";
import Card from "../Card/Card";
import {withRouter} from 'react-router-dom';
import {UPDATE_CURRENT_CARDS, UPDATE_CURRENT_PAGE} from "../../actions/actions";

class Section extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const locationChanged = this.props.location !== prevProps.location;
        if (locationChanged) {
            const currentMultiplier = +this.props.location.pathname.split('/')[1];
            this.props.updateCurrentPage(UPDATE_CURRENT_PAGE, currentMultiplier);
            this.props.updateCurrentCards(UPDATE_CURRENT_CARDS, currentMultiplier - 1)
        }
    }

    render() {
        let cardsArray = [];
        const {currentArray} = this.props.store;
        // обрезаем слишком длинные строки
        function sliceText(string, maxLength) {
            if (string) return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
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
    }),
    dispatch => ({
        updateCurrentPage: (action, payload) => {
            dispatch({type: action, payload: payload})
        },
        updateCurrentCards: (action, payload) => {
            dispatch({type: action, payload: payload})
        }
    })
)(Section))
