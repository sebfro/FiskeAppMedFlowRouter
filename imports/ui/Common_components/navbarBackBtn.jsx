import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Nav, Navbar, NavItem} from 'react-bootstrap';




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
                <Navbar fixedTop={true} height={1} pullRight>
                    <Nav pullLeft>
                        <NavItem
                                 type="button"
                                 aria-hidden="true"
                                 onClick={(e) => {e.preventDefault();
                                 FlowRouter.go("/homepage");}}>
                            <div className="glyphicon glyphicon-arrow-left"/>
                        </NavItem>
                    </Nav>
                </Navbar>
        );
    }
}
