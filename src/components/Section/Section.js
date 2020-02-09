import React, {Component} from 'react';
import styles from './Section.scss';

export default class Section extends Component {
    render() {
        return(
            <section className={styles.section}>
                {this.props.children}
            </section>
        )
    }
}
