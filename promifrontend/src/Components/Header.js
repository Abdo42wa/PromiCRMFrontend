import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userAction'
import promiLogo from '../Images/promi-logo_baltas2.png'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'


//const cookies = new Cookies();

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const usersReducer = useSelector(state => state.usersReducer)
    const { currentUser } = usersReducer

    const logoutHandler = () => {
        if (usersReducer.currentUser === null) {
            history.push('/login')
        }
        //console.log(JSON.stringify(cookies.get('jwt').value))
        dispatch(logout())
    }
    return (
        <div>
            <Navbar bg='dark' variant="dark" expand='lg' className='py-4'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/" style={{ fontSize: '30px !important;' }}>
                            <img
                                src={promiLogo}
                                width="100%"
                                height="100%"
                                className="d-inline-block align-top"
                                alt="Promi"
                            />
                            {/*  */}
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {currentUser ? (
                                <>
                                    <LinkContainer to='/'>
                                        <Nav.Link href="/">Pagrindinis</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/userlist'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-users"></i> Naudotojai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        {/* produktams priskirtos medziagos */}
                                        <LinkContainer to='/materials-warehouse'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-pallet"></i> Medžiagų sandėlys
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        {/* pristatymai */}
                                        <LinkContainer to='/customers'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-user-friends"></i> Klientai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/warehouse-countings'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-boxes"></i> Sandėlys
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        {/* countries */}
                                        <LinkContainer to='/bonuses'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-money-check"></i> Bonusai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/orders'>
                                            <NavDropdown.Item>
                                                <i class="fas fa-tools"></i> Užsakymai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/products'>
                                            <NavDropdown.Item>
                                                <i class="fas fa-boxes"></i> Produktai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/weeklyWorkScheduleScreen'>
                                            <NavDropdown.Item>
                                                <i class="fas fa-calendar-week"></i> Savaitės ukio darbai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/sales-channels'>
                                            <NavDropdown.Item>
                                                <i class="fas fa-truck-loading"></i> Pardavimo kanalai
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        {/* <LinkContainer to='/recent-works'>
                                            <NavDropdown.Item>
                                                <i class="fas fa-tools"></i> Atlikti darbai
                                            </NavDropdown.Item>
                                        </LinkContainer> */}
                                    </NavDropdown>

                                    <NavDropdown title='Papildomi' id='extraMenu'>
                                        <LinkContainer to='/materials'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-toolbox"></i> Produktams priskirtos medžiagos
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/shipments'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-shipping-fast"></i> Pristatymai
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/countries'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-globe"></i> Šalys
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>


                                    <LinkContainer to='/login'>
                                        <Nav.Link onClick={logoutHandler} >
                                            <i className="fas fa-sign-out-alt"></i> Log Out
                                        </Nav.Link>
                                    </LinkContainer>


                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link >
                                            <i className='fas fa-user'></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>


                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
