import React, {useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { objectIsEmpty, userHasRole, objectHasRole } from '../../helpers';
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
            to: "/user-manager",
            label: "Потребители",
            roles: [role.ADMIN],
        },
        {
            exact: true,
            to: "/child/all",
            label: "Деца",
            roles: [role.OEPG],
        },
        {
            exact: true,
            to: "/family/all",
            label: "Семейства",
            roles: [role.OEPG],
        },
        {
            exact: true,
            to: "/user/profile",
            label: loggedUser.email,
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
            to: "/logout",
            label: "Изход",
            roles: [role.LOGGED],
        },
    ];

    const renderNavItems = () => {
        const navButtons = buttons.map((button, index) => {
            if(objectHasRole(button, role.ALL)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role logged
            else if(objectHasRole(button, role.LOGGED) && !objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role guest
            else if(objectHasRole(button, role.GUEST) && objectIsEmpty(loggedUser)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role admin
            else if(objectHasRole(button, role.ADMIN) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.ADMIN)) {
                return <NavItem key={index}>
                    <NavLink tag={RRNavLink} exact={button.exact} to={button.to} activeClassName="active">{button.label}</NavLink>
                </NavItem>
            }
            // role OEPG
            else if(objectHasRole(button, role.OEPG) && !objectIsEmpty(loggedUser) && userHasRole(loggedUser, role.OEPG)) {
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

    return <>
        <Navbar color="primary" dark expand="md">
            <Container>
                <NavLink
                    tag={RRNavLink}
                    className="navbar-brand"
                    exact to="/">
                    {/* <i className="fa fa-child mr-3"></i> */}
                    <span className="project-name">Приемна грижа</span>
                </NavLink>
                <NavbarToggler onClick={toggleIsOpen} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {renderNavItems()}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </>;

}

export default Header;