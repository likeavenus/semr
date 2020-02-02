import React, {Component} from 'react';
import styles from './Header.scss';
import logo from './img/logo.svg';

export default class Header extends Component {
    render() {
        return (
            <header className={styles.header}>
                <img src={logo} alt="semrush"/>
            </header>
        );
    }
}
