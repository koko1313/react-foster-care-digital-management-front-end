import React, {useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { objectIsEmpty, userHasRole } from '../../helpers';
import role from '../../roles';

import {NavLink as RRNavLink} from 'react-router-dom';
import Container from "../../../node_modules/reactstrap/lib/Container";

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
            roles: [role.ALL],
        },
        {
            exact: true,
            to: "/children",
            label: "Деца",
            roles: [role.LOGGED],
        },
        {
            exact: true,
            to: "/login",
            label: "Вход",
            roles: [role.GUEST],
        },
        {
            exact: true,
            to: "/profile",
            label: loggedUser.email,
            roles: [role.LOGGED],
        },
        {
            exact: true,
            to: "/admin-panel",
            label: "Админ панел",
            roles: [role.ADMIN],
        },
        {
            exact: true,
            to: "/logout",
            label: "Изход",
            roles: [role.LOGGED],
        },
    ];

    const renderNavItems = () => {
        const navButtons = buttons.map((button, index) => {
            if(button.roles.includes(role.ALL)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role logged
            else if(button.roles.includes(role.LOGGED) && !objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role guest
            else if(button.roles.includes(role.GUEST) && objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role admin
            else if(button.roles.includes(role.ADMIN) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.ADMIN)) {
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