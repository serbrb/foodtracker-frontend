import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const FoodEditItem = ({ show, onHide, foodItem, refreshItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    quantity: '',
    userId: localStorage.getItem("userId"),
    date: '',
    time: '',
  });

  useEffect(() => {
    if (foodItem) {
        let data = {
            name: foodItem.name,
            description: foodItem.description,
            calories: foodItem.calories,
            quantity: foodItem.quantity,
            userId: localStorage.getItem("userId"),
            date: foodItem.date,
            time: foodItem.localTime,
          }
      setFormData(data);
    }
  }, [foodItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8001/api/v1/food-details/${foodItem.id}`, formData);
    refreshItems();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Food Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="calories" className="mt-3">
            <Form.Label>Calories / 100g</Form.Label>
            <Form.Control
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="quantity" className="mt-3">
            <Form.Label>Quantity(g)</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <Form.Group controlId="date" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="time" className="mt-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FoodEditItem;
