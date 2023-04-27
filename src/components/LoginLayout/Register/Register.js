import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function Register({ handleRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('* Passwords do not match');
            return;
        }

        if (name && email && password && confirmPassword) {
            handleRegister({ name, email, password,confirmPassword });
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
        }
    }

    return (
        <React.Fragment>
            <div className="row justify-content-center mt-5">
                <Card className='w-50 p-0'>
                    <Card.Header className="fw-semibold">Register</Card.Header>
                    <Card.Body className='mx-4'>
                        <Form className='py-4' onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3">
                                    Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} value={name} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">
                                    E-mail Address
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="email" placeholder="Enter your E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="password" minLength={8} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Confirm Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="password" minLength={8} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                                    {errorMessage && <div className="text-danger" style={{ fontSize: '0.9em' }}><small>{errorMessage}</small></div>}
                                </Col>
                            </Form.Group>
                            <div className='text-center'>
                                <Button variant="primary me-2" type="submit">
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>

                </Card>
            </div>
        </React.Fragment>
    )
}

export default Register