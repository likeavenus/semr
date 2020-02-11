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
    Link
} from "react-router-dom";
import Card from "./components/Card/Card";
import {UPDATE_CURRENT_CARDS, UPDATE_CURRENT_PAGE} from "./actions/actions";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            multiplier: 0,
            currentCards: [],
        }

    }

    handleOnLinkClick = (id) => {
        this.setState({
            multiplier: id,
        });

        this.props.getNewCurrentPage(UPDATE_CURRENT_PAGE, id + 1);
    };



    render() {

        const LinksArray = [];
        let cardsArray = [];
        const {pages} = this.props.store;
        const {multiplier, currentCards} = this.state;

        // обрезаем слишком длинные строки
        function sliceText(string, maxLength) {
            return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
        }

        const MAX_CARDS = 9;
        if (currentCards.length) {
            console.log(currentCards, 'RENDER');
            for (let i = multiplier * MAX_CARDS; i < (multiplier * MAX_CARDS) + MAX_CARDS; i++) {
                cardsArray.push(
                    <Card
                        key={i}
                        file={currentCards[i].file}
                        cardTitle={sliceText(currentCards[i].inputTitle, 40)}
                        cardText={sliceText(currentCards[i].inputDescription, 150)}
                        type={sliceText(currentCards[i].type, 12)}
                        weight={currentCards[i].weight}
                    />
                );
            }
        }

        // let id = 0;
        // for (let i of cards) {
        //     cardsArray.push(
        //         <Card
        //             key={id}
        //             file={i.file}
        //             cardTitle={sliceText(i.inputTitle, 40)}
        //             cardText={sliceText(i.inputDescription, 150)}
        //             type={sliceText(i.type, 12)}
        //             weight={i.weight}
        //         />
        //     );
        //     id += 1;
        // }


        for (let i = 0; i < pages; i++) {
            // RoutesArray.push(
            //     <Route key={i} render={()=> <Section key={multiplier} children={cardsArray}/>} exact path={`/:pageId`}/>
            // );
            LinksArray.push(
                <Link key={i} onClick={()=> {this.handleOnLinkClick(i)}} className={pageStyles.link} to={`/${i+1}`}>{i + 1}</Link>
            )
        }

        return (
            <HashRouter basename={'/page'}>
                <div className="App">
                    <Header/>
                    <CreateBox/>
                    {/*<Switch>{RoutesArray}</Switch>*/}
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
        }
    })
)(App);
