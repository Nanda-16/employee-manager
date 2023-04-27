import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import DataTable from 'react-data-table-component';
import { Button, Card } from 'react-bootstrap';
import AddEmployee from './AddEmployee/AddEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, addEmployee } from '../../redux/reducers/employeeReducer';
import moment from 'moment';

const formatDate = (date) => {
  if (date)
    return moment(date)?.format('DD-MM-YYYY');
};

const columns = [
  {
    name: 'SI.No',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.first_name,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.last_name,
    sortable: true,
  },
  {
    name: 'Join Date',
    selector: row => formatDate(row.join_date),
    sortable: true,
  },
  {
    name: 'Date of Birth',
    selector: row => formatDate(row.date_of_birth),
    sortable: true,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'Designation',
    selector: row => row.designation_id,
    sortable: true,
  },
];


function Employee() {
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const { user_data } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getEmployee(user_data?.data?.access_token));
  }, []);


  const toggleAdd = () => {
    setAdd(!add)
  }

  const addNewEmployee = (data) => {
    let formData = new FormData();
    formData.append("first_name", data?.data?.first_name);
    formData.append("last_name", data?.data?.last_name);
    formData.append("join_date", data?.data?.joining_date);
    formData.append("date_of_birth", data?.data?.date_of_birth);
    formData.append("designation_id", data?.data?.designation);
    formData.append("gender", data?.data?.gender);
    formData.append("email", data?.data?.email);
    formData.append("mobile", data?.data?.mobile_number);
    formData.append("landline", data?.data?.land_line);
    formData.append("present_address", data?.data?.present_address);
    formData.append("permanent_address", data?.data?.permanent_address);
    formData.append("status", data?.data?.status);
    formData.append("profile_picture", data?.data?.profile_pic);
    formData.append("resume", data?.data?.resume);
    const token = user_data?.data?.access_token
    dispatch(addEmployee({ token, formData })).then((response) => {
      if (response?.payload)
        dispatch(getEmployee(user_data?.data?.access_token));
        setAdd(false);
    })
  }

  return (
    <React.Fragment>
      <NavBar active={'employee'} />
      {!add ? (
        <div className='row justify-content-center mt-3'>
          <Card className="w-75" style={{ border: 'none' }}>
            <Card.Body>
              <div className='d-flex justify-content-between w-100 mb-3 mt-3'>
                <h3>Employee List</h3>
                <Button variant="outline-dark" size="sm" onClick={toggleAdd}>
                  Add New Record
                </Button>
              </div>
              <div className='mt-2'>
                <DataTable
                  columns={columns}
                  data={employee?.data?.data}
                  pagination
                  customStyles={customStyles}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <AddEmployee onAdd={addNewEmployee} setAdd={toggleAdd} />
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

export default Employee