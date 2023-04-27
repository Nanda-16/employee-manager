import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { Button, Card } from 'react-bootstrap';
import AddDesignation from './AddDesignation/AddDesignation';
import { useDispatch, useSelector } from 'react-redux';
import { getDesignation, addDesignation, deleteDesignation, editDesignation } from '../../redux/reducers/designationReducer';

const Designation = () => {
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [selectedData, setSelecteData] = useState(false);
    const dispatch = useDispatch();
    const { designations } = useSelector((state) => state.designations);
    const { user_data } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getDesignation(user_data?.data?.access_token));
    }, []);


    const toggleAdd = () => {
        setAdd(!add)
        setEdit(false);
        setSelecteData('')
    }

    const addNewDesignation = (data) => {
        let formData = new FormData();
        formData.append("designation_name", data?.name);
        const token = user_data?.data?.access_token
        dispatch(addDesignation({ token, formData })).then((response) => {
            toggleAdd();
            dispatch(getDesignation(user_data?.data?.access_token));
        })
    }

    const columns = [
        {
            name: 'SI.No',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <Button variant="secondary" size="sm" className='me-1' onClick={() => updateDesignation(row)}><FiEdit size={'1.3em'} /></Button>
                    <Button variant="secondary" size="sm" onClick={() => removeDesignation(row.id)}><FaTrashAlt size={'1.3em'} /></Button>
                </div>
            ),
        },
    ];

    const updateDesignation = (row) => {
        setEdit(true);
        setSelecteData(row)
        setAdd(true);
    }

    const handleEdit = (data) => {
        const token = user_data?.data?.access_token
        const id = data?.id;
        dispatch(editDesignation({ token, id, formData: { designation_name: data?.name } })).then((response) => {
            toggleAdd();
            dispatch(getDesignation(user_data?.data?.access_token));
        })
    }

    const removeDesignation = (id) => {
        const token = user_data?.data?.access_token
        dispatch(deleteDesignation({ token, id })).then((response) => {
            if (response?.payload?.data?.error) {
                setText(response?.payload?.data?.error);
                setDeleteError(true);
            } else {
                setText(response?.payload?.data?.message);
            }
            setTimeout(() => {
                setText('');
                setDeleteError(false);
            }, 600);
        })

    }


    return (
        <React.Fragment>
            <NavBar active={'designation'} />
            {!add ? (
                <div className='row justify-content-center mt-3'>
                    <Card className="w-75" style={{ border: 'none' }}>
                        <Card.Body>
                            <div className='d-flex justify-content-between w-100 mb-3 mt-3'>
                                <h3>Designation List</h3>
                                <div>
                                    <Button variant="outline-dark" size="sm" onClick={toggleAdd}>
                                        Add New Record
                                    </Button>
                                    <div className={deleteError ? 'text-danger' : 'text-success'}>
                                        {text}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <DataTable
                                    columns={columns}
                                    data={designations?.data?.data}
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <AddDesignation onAdd={addNewDesignation} setAdd={toggleAdd} edit={edit} designation={selectedData} onEdit={handleEdit} />
            )}
        </React.Fragment>
    )
}

const customStyles = {
    rows: {
        style: {
            background: 'rgb(226,226,226)'
        },
    },
};


export default Designation