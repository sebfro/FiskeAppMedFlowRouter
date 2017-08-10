import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Nav, Navbar, NavItem, NavbarBrand} from 'react-bootstrap';



export default class NavBarBackBtn extends Component {
//<span className="glyphicon glyphicon-arrow-right"/>
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            language: Session.get('language'),
        }
    }

    render() {
        let backBtnStyle = {
            paddingLeft: 50000,
        };
        return (
                <Navbar fixedTop={true} className="removeUlLiDot" >
                            <img src="/hiLogoBig.png" className="bigLogo" style={{"height": "auto", "maxHeight": "50px", "width": "200px"}} alt="imr logo"/>
                        <NavItem onClick={(e) => {e.preventDefault(); FlowRouter.go("/homepage");}}>
                            <img src="/home_btn_icon.png" className="backArrow" style={{"height": "auto", "maxHeight": "30px", "width": "30px"}} alt="back button"/>
                        </NavItem>
                </Navbar>
        );
    }
}
