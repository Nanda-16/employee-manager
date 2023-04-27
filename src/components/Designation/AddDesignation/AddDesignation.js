import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';

function AddDesignation({ onAdd, setAdd, edit, designation, onEdit }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (edit)
            setName(designation?.name)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            const id = designation?.id;
            onEdit({ id, name });
        } else {
            if (name)
                onAdd({ name });
        }
        setName('');
    }
    return (
        <React.Fragment >
            <div className="row justify-content-center mt-5">
                <Card className='w-50 p-0'>
                    <Card.Header className="fw-semibold">Add Designation</Card.Header>
                    <Card.Body className='mx-4'>
                        <Form className='pb-4' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label className='fw-bold fs-6'>Designation Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter designation name" onChange={(e) => setName(e.target.value)}
                                    defaultValue={name} required />
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

export default AddDesignation