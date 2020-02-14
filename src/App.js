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
        const RoutesArray = [];
        const {pages} = this.props.store;


        for (let i = 0; i < pages; i++) {
            LinksArray.push(
                <Link key={i} onClick={()=> {this.handleOnLinkClick(i)}} className={pageStyles.link} to={`/${i+1}`}>{i + 1}</Link>
            )
            RoutesArray.push(

            )
        }


        return (
            <HashRouter basename={'/'}>
                <div className="App">
                    <Header/>
                    <CreateBox/>
                    <Switch>
                        <Route exact path={'/:pageId'} render={()=> <Section/>}/>
                        {/*{RoutesArray}*/}
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
