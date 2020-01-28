import React, {useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {NavLink as RRNavLink} from 'react-router-dom';
import Container from "../../../../node_modules/reactstrap/lib/Container";

const Header = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
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
                    <NavItem>
                        <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Начало</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RRNavLink} exact to="/Login" activeClassName="active">Вход</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Container>
    </Navbar>

}

export default Header;