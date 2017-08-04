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
                <Navbar fixedTop={true}>
                    <Navbar.Header>
                        <NavbarBrand>
                            <img src="/hiLogoBig.png" style={{"height": "45%", "width": "15%"}} alt="imr logo"/>
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem
                                 type="button"
                                 aria-hidden="true"
                                 onClick={(e) => {e.preventDefault();
                                 FlowRouter.go("/homepage");}}>
                            <div className="glyphicon glyphicon-arrow-right"/>
                        </NavItem>
                    </Nav>
                </Navbar>
        );
    }
}
