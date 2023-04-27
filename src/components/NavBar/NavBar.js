import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import user from '../../assets/images/businessman.png'
const NavBar = ({ active }) => {
    return (
        <React.Fragment>
            <Navbar expand="lg" sticky="top" className='border-bottom' style={{ background: '#373c40' }}>
                <Container fluid>
                    <Navbar.Brand className='text-white me-4'>Admin Template</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-2 mx-5 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/dashboard">
                                <span className={active === 'home' ? "mx-2 text-white" : "mx-2 text-secondary"}>Home</span>
                            </Link>
                            <Link to="/employee">
                                <span className={active === 'employee' ? "mx-2 text-white" : "mx-2 text-secondary"}>Employees</span>
                            </Link>
                            <Link to="/designation">
                                <span className={active === 'designation' ? "mx-2 text-white" : "mx-2 text-secondary"}>Designations</span>
                            </Link>
                        </Nav>
                        <Navbar.Text className='text-secondary ms-5'>
                            <div className='d-flex'>
                                <span >Welcome Muhammed Shafi P</span>
                                <div className="ms-2" style={{ borderRadius: '50%' }}>
                                    <img src={user} alt="user" style={{ objectFit: 'cover', height: '3vh' }} />
                                </div>
                            </div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}
NavBar.defaultProps = {
    active: "home",
}
export default NavBar