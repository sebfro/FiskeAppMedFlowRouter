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
            float: 'right',
            paddingTop: 14,
            paddingRight: 24,
        };
        return (
                <Navbar fixedTop={true}>
                    <Nav pullRight>
                        <NavItem type="button" className="btn btn-link" style={backBtnStyle} aria-hidden="true"
                                 onClick={(e) => {e.preventDefault(); FlowRouter.go("/homepage");}}>
                            <span className="glyphicon glyphicon-arrow-right"/>
                        </NavItem>
                    </Nav>
                </Navbar>
        );
    }
}
/*
<Navbar.Header>
                        <NavbarBrand>
                            <img src="/imrlogomini.png" style={{"height": "30%", "width": "10%"}} alt="imr logo"/>
                        </NavbarBrand>
                    </Navbar.Header>
 */
/*
<div>
                <Navbar fixedTop={true}>
                    <Nav pullRight>
                        <NavItem type="button" className="btn btn-link" style={backBtnStyle} aria-hidden="true"
                                 onClick={this.backToIndex.bind(this)}>
                            <span className="glyphicon glyphicon-arrow-right"/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
 */