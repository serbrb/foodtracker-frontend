import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../NavBar';
import FoodEditItem from '../component/FoodEditItem';
import FoodAddItem from '../component/FoodAddItem';

const FoodItem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  useEffect(() => {
    fetchFoodItems();
  }, [selectedDate]);

  const fetchFoodItems = async () => {
    // Fetch food items from API
    const response = await axios.get(`http://localhost:8001/api/v1/food-details/${localStorage.getItem("userId")}/${selectedDate}`);
    setFoodItems(response.data);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDelete = async (foodDetailsId, userId) => {
    await axios.delete(`http://localhost:8001/api/v1/food-details/${foodDetailsId}/${localStorage.getItem("userId")}`);
    fetchFoodItems(); // Refresh the list after deletion
  };

  const handleEdit = (foodItem) => {
    setEditItem(foodItem);
    setShowEditModal(true);
  };

  return (
    <>
    <NavBar/>
    <div>
    <Row className="align-items-center mb-6 mt-2">
        <Col md={4}>
    <Form.Group controlId="datePicker">
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      </Form.Group>
      </Col>
      <Col md={4} className="text-end">
      <h5>TOTAL CALORIES: <Badge bg="success">{foodItems.todayTotalCalories}</Badge></h5>
      </Col>
      <Col md={4} className="text-end">
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Food Item
      </Button>
      </Col></Row>
      

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Calories / 100g</th>
            <th>Quantity(g)</th>
            <th>Time</th>
            <th>Total Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {foodItems && foodItems.foodDetails && foodItems.foodDetails.length ===0 ? (
           <tr key={1}>
            <td colSpan={7} style={{color:'red'}}>No records found</td>
            </tr>
        ):""}
          {foodItems && foodItems.foodDetails && foodItems.foodDetails.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.calories}</td>
              <td>{item.quantity}</td>
              
              <td>{item.localTime}</td>
              <td>{item.totalCalories}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item.id, item.userId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Add Modal */}
      <FoodAddItem show={showAddModal} onHide={() => setShowAddModal(false)} refreshItems={fetchFoodItems} />

      {/* Edit Modal */}
      {editItem && (
        <FoodEditItem
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          foodItem={editItem}
          refreshItems={fetchFoodItems}
        />
      )}
    </div>
    </>
  );
};

export default FoodItem;
