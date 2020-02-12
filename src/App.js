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
    Switch,
    Link,
} from "react-router-dom";

import Card from "./components/Card/Card";
import {UPDATE_CURRENT_CARDS, UPDATE_CURRENT_PAGE} from "./actions/actions";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            multiplier: 0,
        }

    }

    handleOnLinkClick = (id) => {
        this.setState({
            multiplier: id,
        });

        this.props.getNewCurrentPage(UPDATE_CURRENT_PAGE, id + 1);
        this.props.updateCurrentCards(UPDATE_CURRENT_CARDS, id);
    };


    render() {

        const LinksArray = [];
        let cardsArray = [];
        const {pages, currentArray} = this.props.store;

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


        for (let i = 0; i < pages; i++) {
            LinksArray.push(
                <Link key={i} onClick={()=> {this.handleOnLinkClick(i)}} className={pageStyles.link} to={`/${i+1}`}>{i + 1}</Link>
            )
        }

        return (
            <HashRouter basename={'/page'}>
                <div className="App">
                    <Header/>
                    <CreateBox/>
                    <Switch>
                        <Route exact path={'/:pageId'} render={ (props) => <Section key={props.match.params.pageId} {...props} children={cardsArray}/> }/>
                    </Switch>
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
    }),
    dispatch => ({
        getNewCurrentPage: (action, payload) => {
            dispatch({type: action, payload: payload})
        },
        updateCurrentCards: (action, payload) => {
            dispatch({type: action, payload: payload});
        }
    })
)(App);
