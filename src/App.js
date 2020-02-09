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


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            multiplier: 0
        }

    }

    handleOnLinkClick = (id) => {
        console.log(id);
        this.setState({
            multiplier: id
        });
    };

    render() {

        const RoutesArray = [];
        const LinksArray = [];
        const {pages, cards, totalWeight} = this.props.store;

        let cardsArray = [];

        function sliceText(string, maxLength) {
            return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
        }
        let id = 0;
        for (let i of cards) {
            cardsArray.push(
                <Card
                    key={id}
                    file={i.file}
                    cardTitle={sliceText(i.inputTitle, 40)}
                    cardText={sliceText(i.inputDescription, 150)}
                    type={sliceText(i.type, 12)}
                    weight={i.weight}
                />
            );
            id += 1;
        }

        const {multiplier} = this.state;
        let MAX_CARDS = 9;

        // let cardsWeight = 0;
        // for (let i = 0; i < cardsArray.length; i++) {
        //     cardsWeight += cardsArray[i].props.weight;
        // }
        // console.log(cardsWeight);


        cardsArray = cardsArray.slice(multiplier * MAX_CARDS, (multiplier * MAX_CARDS) + MAX_CARDS);

        // console.log('ARRAY', cardsArray);



        for (let i = 0; i < pages; i++) {
            RoutesArray.push(
                <Route key={i} render={(...props)=> <Section key={multiplier} {...props} children={cardsArray}/>} exact path={`/:pageId`}/>
            );
            LinksArray.push(
                <Link key={i} onClick={()=> {this.handleOnLinkClick(i)}} className={pageStyles.link} to={`/${i+1}`}>{i + 1}</Link>
            )
        }



        return (
            <HashRouter basename={'/page'}>
                <div className="App">
                    <Header/>
                    <CreateBox/>
                    <Switch>{RoutesArray}</Switch>
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
