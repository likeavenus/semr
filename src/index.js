import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {CREATE_CARD, INCREASE_PAGES, UPDATE_CURRENT_CARDS, UPDATE_CURRENT_PAGE} from "./actions/actions";
const initialState = {
    cards: [],
    currentArray: [],
    totalWeight: 0,
    pages: 1,
    currentPage: 1,
};

const store = createStore(getCardsList, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function getCardsList(state = initialState, action) {
    switch (action.type) {
        case CREATE_CARD:
            return {...state, cards: [...state.cards, action.payload], totalWeight: state.totalWeight += action.payload.weight};
        case INCREASE_PAGES:
            return {...state, pages: state.pages += 1};
        case UPDATE_CURRENT_PAGE:
            return {...state, currentPage: action.payload};
        case UPDATE_CURRENT_CARDS:
            return updateCurrentArray(state, action);
        default: return {...state};
    }
}

function updateCurrentArray(state, action) {
    const currentArr = [];
    const MAX_CARDS = 9;
    for (let i = action.payload * MAX_CARDS; i < (action.payload * MAX_CARDS) + MAX_CARDS; i++) {
        if (state.cards[i] !== undefined) {
            currentArr.push(state.cards[i]);
        }
    }
    return {...state, currentArray: currentArr};
}




// console.log(store.getState());

store.subscribe(() => {
    console.log('getState', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
