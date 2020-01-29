import React, {useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { objectIsEmpty } from '../../../helpers';

import {NavLink as RRNavLink} from 'react-router-dom';
import Container from "../../../../node_modules/reactstrap/lib/Container";

import { useSelector } from 'react-redux';

const Header = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const loggedUser = useSelector(state => state.loggedUser);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const buttons = [
        {
            exact: true,
            to: "/",
            label: "Начало",
            roles: {},
        },
        {
            exact: true,
            to: "/children",
            label: "Деца",
            roles: {},
        },
        {
            exact: true,
            to: "/login",
            label: "Вход",
            roles: {},
            showWhenLogged: false,
        },
        {
            exact: true,
            to: "/logout",
            label: loggedUser.email,
            roles: {},
            showWhenLogged: true,
        },
        {
            exact: true,
            to: "/protected",
            label: "Protected",
            roles: {},
        },
    ];

    const renderNavItems = () => {
        const navButtons = buttons.map((button, index) => {
            if(!button.showWhenLogged && objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            } 
            else if(button.showWhenLogged && !objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            else if(button.showWhenLogged === undefined) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            else {
                return null;
            }
        });

        return navButtons;
    }

    return <Navbar color="primary" dark expand="md">
        <Container>
            <NavLink
                tag={RRNavLink}
                className="navbar-brand"
                exact to="/">
                <i className="fa fa-cubes mr-3"></i>
                <span className="project-name">Software Technologies</span>
            </NavLink>
            <NavbarToggler onClick={toggleIsOpen} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {renderNavItems()}
                </Nav>
            </Collapse>
        </Container>
    </Navbar>

}

export default Header;