import React, { useState, useEffect } from 'react';

import InventoryList from './InventoryList';
import axios from 'axios';
import Inventoryitems from './InventoryItems';
function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/items'); // Assuming API endpoint for fetching items
        setItems(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchItems();
  }, []); // Run only on component mount

  const handleItemCreate = (newItem) => {
    // Add the new item to the state (if not using a shared state management library)
    setItems([...items, newItem]);
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      <Inventoryitems onCreate={handleItemCreate} />
      <InventoryList items={items} />
    </div>
  );
}

export default InventoryPage;