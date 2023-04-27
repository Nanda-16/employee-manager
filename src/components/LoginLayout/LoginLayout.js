import React, { useEffect, useState } from 'react'
import Register from './Register/Register';
import Login from './Login/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegister } from '../../redux/reducers/userReducer';
import { Container, Nav, Navbar } from 'react-bootstrap';

function LoginLayout() {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (status === 'fulfilled') {
            navigate("/dashboard");
        }
    }, [navigate, status]);

    const handleLogin = async (data) => {
        setLoading(true);
        document.getElementById("error_message").innerHTML = "";
        let formData = new FormData();
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        dispatch(userLogin(formData)).then((response) => {
            if (response?.payload?.data) {
                navigate('/dashboard');
            } else {
                document.getElementById('error_message').innerHTML = '<small><i>Something Went Wrong.Try Again !!!</i></small>';
            }
        });
        setLoading(false);
    };

    const handleRegister = (data) => {
        setLoading(true)
        document.getElementById('error_message').innerHTML = '';
        let formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("password_confirmation", data?.confirmPassword);
        dispatch(userRegister(formData)).then((response) => {
            if (response?.payload?.data) {
                navigate('/dashboard');
            } else {
                document.getElementById('error_message').innerHTML = '<small><i>Something Went Wrong.Try Again !!!</i></small>';
            }
        })
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }
    const toggleRegister = () => {
        document.getElementById('error_message').innerHTML = '';
        setRegister(!register)
    }
    return (
        <React.Fragment>
            {!loading ? (
                <>
                    <Navbar expand="lg" sticky="top" bg="white" className='border-bottom' style={{}}>
                        <Container fluid>
                            <Navbar.Brand className='fw-semibold me-4'>Employee Manager</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="my-2 mx-5 my-lg-0 ms-auto"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <div onClick={toggleRegister} className={`col mx-2 ${register ? "" : "text-black fw-semibold"}`}>Login</div>
                                    <div onClick={toggleRegister} className={`col mx-2 ${register ? "text-black fw-semibold" : ""}`}>Register</div>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {register ? (
                        <Register handleRegister={handleRegister} />
                    ) : (
                        <Login handleLogin={handleLogin} />
                    )}
                    <div className='text-center text-danger mt-3' style={{ fontSize: '0.9em' }} id="error_message"></div>
                </>
            ) : (
                <></>
            )}
        </React.Fragment>
    )
}

export default LoginLayout
