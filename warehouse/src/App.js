import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [shipments, setShipments] = useState([]);
  const [formData, setFormData] = useState({
    Date: '',
    WarehouseID: '',
    ShippingPO: '',
    ShipmentID: '',
    BoxesRcvd: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('https://example.com/shipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      // add the new shipment to the state array
      setShipments([...shipments, data]);
      // reset the form data
      setFormData({
        Date: '',
        WarehouseID: '',
        ShippingPO: '',
        ShipmentID: '',
        BoxesRcvd: ''
      });
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetch('https://example.com/shipments')
      .then(response => response.json())
      .then(data => setShipments(data));
  }, []);


  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="text" name="Date" value={formData.Date} onChange={(e) => setFormData({...formData, Date: e.target.value})} />
      </label>
      <label>
        WarehouseID:
        <input type="text" name="WarehouseID" value={formData.WarehouseID} onChange={(e) => setFormData({...formData, WarehouseID: e.target.value})} />
      </label>
      <label>
        ShippingPO:
        <input type="text" name="ShippingPO" value={formData.ShippingPO} onChange={(e) => setFormData({...formData, ShippingPO: e.target.value})} />
      </label>
      <label>
        ShipmentID:
        <input type="text" name="ShipmentID" value={formData.ShipmentID} onChange={(e) => setFormData({...formData, ShipmentID: e.target.value})} />
      </label>
      <label>
        BoxesRcvd:
        <input type="text" name="BoxesRcvd" value={formData.BoxesRcvd} onChange={(e) => setFormData({...formData, BoxesRcvd: e.target.value})} />
      </label>
      <button type="submit">Add Shipment</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>WarehouseID</th>
          <th>ShippingPO</th>
          <th>ShipmentID</th>
          <th>BoxesRcvd</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map(shipment => (
          <tr key={shipment.ShipmentID}>
            <td>{shipment.Date}</td>
            <td>{shipment.WarehouseID}</td>
            <td>{shipment.ShippingPO}</td>
            <td>{shipment.ShipmentID}</td>
            <td>{shipment.BoxesRcvd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  );
}

export default App;
