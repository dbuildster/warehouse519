import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider} from '@react-oauth/google';
import Google from './google';

function App() {
  const [shipments, setShipments] = useState([]);
  const [formData, setFormData] = useState({
    Date: '',
    WarehouseID: '',
    ShippingPO: '',
    ShipmentID: '',
    BoxesRcvd: ''
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [text, setText] = useState("");

  const handleSignIn = () => {
    console.log('Signed in successfully!');
    setIsSignedIn(true);
    console.log(isSignedIn);
    setAuthenticated(true);
    
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  
    const formData = new FormData();
    formData.append('apikey', 'K82791252488957');
    formData.append('file', event.target.files[0]);
  
    fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setText(data.ParsedResults[0].ParsedText);
      })
      .catch((error) => console.error(error));
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

const handleSubmit_file_link = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const image = formData.get("image");

  fetch("https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY", {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: btoa(image),
          },
          features: [
            {
              type: "TEXT_DETECTION",
            },
          ],
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setText(data.responses[0].fullTextAnnotation.text);
    });
};


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
    {isSignedIn ? (
      <>
      {authenticated && <p>You are authenticated!</p>}

      <form onSubmit={handleSubmit_file_link}>
      <div>
        <label htmlFor="file">Upload file:</label>
        <input type="file" id="file" name="file" onChange={handleImageUpload} />
        <p>{text}</p>
      </div>
      <div>
        <label htmlFor="link">Or enter a link:</label>
        <input type="text" id="link" name="link" value={link} onChange={handleLinkChange} />
      </div>
      <button type="submit">Submit</button>
    </form>

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
  ) : (
    <div>
    <GoogleOAuthProvider clientId="1033708814286-3og4qusmqh3mkgu3lbb0lp9hn3ojn9p4.apps.googleusercontent.com">
      <Google onSignIn={handleSignIn} setIsSignedIn={setIsSignedIn} />
      {authenticated && <p>You are authenticated!</p>}
    </GoogleOAuthProvider>
    
    </div>
  )}
</>
  );
}

export default App;
