import React from 'react'
import NavBar from '../NavBar'
import { Table, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
export const Users = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const response = axios.get(`http://localhost:8001/api/v1/user`).then(resp => {
            setUsers(resp.data);
        });
    }, [])
 
  return (
    <>
    <NavBar/>
    <Row className="align-items-center mb-6 mt-2">
        <Col md={2}></Col>
        <Col md={8}>
    <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
        {users  && users.length ===0 ? (
           <tr key={1}>
            <td colSpan={7} style={{color:'red'}}>No Users found</td>
            </tr>
        ):""}
          {users && users.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.userName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      <Col md={2}></Col>
      </Row>
    </>
  )
}
