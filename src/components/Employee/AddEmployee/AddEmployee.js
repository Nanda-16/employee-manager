import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddEmployee = ({ onAdd, setAdd }) => {
    const [data, setData] = useState({});
    const [sameAddress, setSameAddress] = useState(false);
    const { designations } = useSelector((state) => state.designations);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data) {
            onAdd({ data });
            setData({});
        }
    }
    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox" && checked) {
            const present_address = document.getElementById("present_address_id");
            const permanent_address = document.getElementById("permanent_address_id");
            permanent_address.value = present_address.value;
        }
        if (name === 'profile_pic') {
            setData({ ...data, [name]: e.target.files[0] });
        } else if (name === 'resume') {
            setData({ ...data, [name]: e.target.files[0] });
        } else if (name === 'present_address') {
            setSameAddress(false);
            setData({ ...data, [name]: value });
        } else {
            setData({ ...data, [name]: value });
        }
    }
    return (
        <React.Fragment >
            <div className="row justify-content-center mt-5">
                <Card className='w-50 p-0'>
                    <Card.Header className="fw-semibold">Add Employee</Card.Header>
                    <Card.Body className='mx-4'>
                        <Form className='pb-4' onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    First Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" name="first_name" placeholder="Enter your First Name" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Last Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" name="last_name" placeholder="Enter your Last Name" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Joining Date
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="date" name="joining_date" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Date of Birth
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="date" name="date_of_birth" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Designation
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select name="designation" onClick={(e) => handleInput(e)} required id="designation_id">
                                        {designations?.data?.data?.map((designation) => (
                                            <option value={designation?.id}>{designation?.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Gender
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Check inline label="Male" name="gender" type='radio' value='male' id='male' onClick={(e) => handleInput(e)} />
                                    <Form.Check inline label="Female" name="gender" type="radio" value='female' id='female' onClick={(e) => handleInput(e)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Mobile Number
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" name="mobile_number" placeholder="Enter your Mobile Number" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Landline
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" name="land_line" placeholder="Enter your landline" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Email Address
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="email" name="email" placeholder="Enter your Email" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Present Address
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" placeholder="Enter Present Address" id="present_address_id" name="present_address" onChange={(e) => handleInput(e)} required />
                                    <Form.Text className="text-muted">
                                        <Form.Check inline label="Same as Present Address" type="checkbox" checked={sameAddress} onChange={(e) => { handleInput(e); setSameAddress(e.currentTarget.checked); }} />
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Permanent Address
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" placeholder="Enter Permanent Address" id="permanent_address_id" name="permanent_address" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Status
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select name="status" onChange={(e) => handleInput(e)} required id="status_id">
                                        <option value="1">Accepted</option>
                                        <option value="0">Pending</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Profile Pic
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="file" name="profile_pic" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                <Form.Label column sm="3" className="fw-semibold">
                                    Resume
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="file" name="resume" onChange={(e) => handleInput(e)} required />
                                </Col>
                            </Form.Group>
                            <Button variant="outline-secondary me-2" type="submit">
                                Submit
                            </Button>
                            <Button variant="outline-secondary me-2" type="submit" onClick={setAdd}>
                                Cancel
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default AddEmployee