import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="#home">Primo</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/'>
                                <Nav.Link href="#home">Home</Nav.Link>
                            </LinkContainer>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <LinkContainer to='/login'>
                                <Nav.Link >
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
