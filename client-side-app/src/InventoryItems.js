import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function Inventoryitems() {
  const [show, setShow] = useState(false); // Modal state for create form
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // For displaying uploaded image preview

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axios.post('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/items/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Handle successful creation
      setName('');
      setQuantity(0);
      setImageFile(null);
      setImageUrl(''); // Clear image preview after upload
      handleClose();
    } catch (error) {
      console.error(error.response.data); // Handle errors
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
          Create Item
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formItemQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formItemImage">
              <Form.Label>Image (Optional)</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%' }} />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Inventoryitems;


