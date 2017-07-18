import React, {Component} from 'react';
import {NavItem} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

const homepageStyle = {
    float: 'right',
    paddingTop: 14,
    paddingRight: 24,
};

const loginStyle = {
    float: 'right',
    paddingTop: 20,
};

export default class FlagBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag: localStorage.getItem('language') === 'en-US' ?
                "/united_kingdom_flag_icon.png" : "/norway_flag_icon.png"
        }
    }

    changeLanguage(){
        i18n.getLocale() === 'en-US' ? this.setLanguage('nb-NO') :
            this.setLanguage('en-US');
        this.showFlag();
    }

    setLanguage(locale){
        i18n.setLocale(locale);
        localStorage.setItem('language', locale);
    }

    showFlag(){
        let flag;
        if(i18n.getLocale() === 'en-US'){
            flag = "/united_kingdom_flag_icon.png"
        } else {
            flag = "/norway_flag_icon.png"
        }

        this.setState({
            flag: flag
        })
    }

    render(){
        return(
            <NavItem onClick={this.changeLanguage.bind(this)} style={this.props.homepage ? homepageStyle : loginStyle}>
                <img src={this.state.flag} height={20} width={20} alt=""/>
            </NavItem>
        )
    }
}