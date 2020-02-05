import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {CREATE_CARD} from "./actions/createCard";

const initialState = {
    cards: []
};



function getCardsList(state = initialState, action) {
    switch (action.type) {
        case CREATE_CARD:
            return {...state, cards: [...state.cards, action.payload]};
        default: return {...state};
    }
}

const store = createStore(getCardsList, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store.getState());

store.subscribe(() => {
    console.log('getState', store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
