import React, {Component} from 'react';
import styles from './Pagination.scss';
import {connect} from "react-redux";

class Pagination extends Component {
    render() {
        return (
            <div className={styles.pagination}>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    })
)(Pagination);
