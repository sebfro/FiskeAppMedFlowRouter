import React, {Component} from 'react';
import {NavItem} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

const loginStyle = {
    float: 'right',
    paddingTop: 20,
};

export default class FlagBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: localStorage.getItem('language') === 'en-US' ?
                "/flag_icon_United-Kingdom.png" : "/flag_icon_norway.png"
        }
    }

    changeLanguage() {
        i18n.getLocale() === 'en-US' ? i18n.setLocale('nb-NO') :
            i18n.setLocale('en-US');
        localStorage.setItem('language', i18n.getLocale());
        this.showFlag();
    }

    showFlag() {
        let flag;
        if (i18n.getLocale() === 'en-US') {
            flag = "/flag_icon_United-Kingdom.png"
        } else {
            flag = "/flag_icon_norway.png"
        }

        this.setState({
            flag: flag
        })
    }

    /*
    <NavItem onClick={this.changeLanguage.bind(this)}
                         style={this.props.homepage ? homepageStyle : loginStyle}>
                    <img onClick={this.changeLanguage.bind(this)} src={this.state.flag} height={20} width={20} alt=""/>
                </NavItem>
     */

    render() {
        if (this.props.loginScreen) {
            return (
                <NavItem onClick={this.changeLanguage.bind(this)}>
                    <img src={this.state.flag} height={20} width={20} alt=""/>
                </NavItem>
            )
        } else {
            return (
                <div onClick={this.changeLanguage.bind(this)}
                     style={loginStyle}>
                    <img src={this.state.flag} height={30} width={30} alt=""/>
                </div>
            )
        }
    }
}