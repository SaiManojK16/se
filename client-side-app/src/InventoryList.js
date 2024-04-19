import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './InventoryList.css';

function InventoryList() {
  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/items');
        setItems(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setShowModal(true);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateItem = async () => {
    try {
      const newItem = { name: itemName, quantity: itemQuantity };
      await axios.post('http://localhost:5000/api/items/create', newItem);
      // After creating the item, fetch the updated list of items
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
      setIsEmpty(response.data.length === 0);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const updatedItem = { ...selectedItem, name: itemName, quantity: itemQuantity };
      await axios.put(`http://localhost:5000/api/items/${selectedItem._id}`, updatedItem);
      setItems(items.map((item) => (item._id === selectedItem._id ? updatedItem : item)));
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEmpty ? (
        <Alert variant="warning">There are no items in your inventory.</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="image-cell">
                    {item.image && (
                      <div className="image-container">
                        <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="item-image" />
                      </div>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleUpdateClick(item)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem ? 'Edit Item' : 'Create Item'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="itemName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="itemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary" onClick={selectedItem ? handleUpdateItem : handleCreateItem}>{selectedItem ? 'Save Changes' : 'Create'}</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default InventoryList;