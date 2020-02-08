import React,{Component} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import CreateBox from './components/CreateBox/CreateBox';
import Section from "./components/Section/Section";
import Pagination from "./components/Pagination/Pagination";
import pageStyles from './components/Pagination/Pagination.scss';
import {connect} from "react-redux";
import {
    HashRouter,
    // Switch,
    Route,
    Link
} from "react-router-dom";


class App extends Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
            <HashRouter>

                <div className="App">
                    <Header/>
                    <CreateBox/>
                    <Section/>
                    <Pagination
                        children={''}
                    />
                </div>
            </HashRouter>
        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        handleIncreasePage: (action) => {
            dispatch({type: action})
        }
    })
)(App);
