import React, {Component} from 'react';
import styles from './Pagination.scss';
import {connect} from "react-redux";

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: 0
        };
    }

    componentDidMount() {
        const {totalWeight} = this.props.store;
        console.log(totalWeight);
    }

    render() {
        return (
            <div className={styles.pagination}>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    })
)(Pagination);
