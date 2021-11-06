import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userAction'

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { currentUser } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
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
                            {currentUser ? (
                                <LinkContainer to='/login'>
                                    <Nav.Link onClick={logoutHandler} >
                                        <i className='fas fa-user'></i> Log Out
                                    </Nav.Link>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link >
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
