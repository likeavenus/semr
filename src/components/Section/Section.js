import React, {Component} from 'react';
import styles from './Section.scss';
import {connect} from 'react-redux';

class Section extends Component {
    render() {
        console.log(this.props.store.cards)
        return(
            <section className={styles.section}>

            </section>
        )
    }
}

export default connect(
    state => ({
        store: state
    }))
(Section);
