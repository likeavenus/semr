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
    Route,
    Link
} from "react-router-dom";
import Card from "./components/Card/Card";


class App extends Component {
    constructor(props) {
        super(props);

    }


    render() {

        const RoutesArray = [];
        const LinksArray = [];
        const pages = this.props.store.pages;

        for (let i = 0; i < pages; i++) {
            RoutesArray.push(
                <Route key={i} path={`page=${i}`} component={Section}/>
            );
            LinksArray.push(
                <Link key={i} className={pageStyles.link} to={`page=${i+1}`}>{i + 1}</Link>
            )
        }

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

        return (
            <HashRouter>
                {RoutesArray}
                <div className="App">
                    <Header/>
                    <CreateBox/>
                    <Section
                        children={cardsArray}
                    />
                    <Pagination
                        children={LinksArray}
                    />
                </div>
            </HashRouter>
        )
    }
}

export default connect(
    state => ({
        store: state
    })
)(App);
