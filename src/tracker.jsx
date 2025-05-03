import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import carbonImage1 from "./assets/22.avif";

const TrackerPage = () => {
  const [email, setEmail] = useState('');
  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('meat');
  const [shopping, setShopping] = useState('');
  const [result, setResult] = useState(null);
  const [showResultButton, setShowResultButton] = useState(false);

  const navigate = useNavigate();

  const calculateEmissions = () => {
    if (!email) {
      alert('Please enter your email!');
      return;
    }

    const travelEmission = parseFloat(travel || 0) * 0.21;
    const electricityEmission = parseFloat(electricity || 0) * 0.92;
    const foodFactors = { meat: 3, vegetarian: 1.7, vegan: 1.5 };
    const foodEmission = foodFactors[food] * 30; 
    const shoppingEmission = parseFloat(shopping || 0) * 0.00075;

    const total = travelEmission + electricityEmission + foodEmission + shoppingEmission;
    setResult(total.toFixed(2));

    axios.post('http://localhost:5000/api/track', {
      email,
      travel: +travel,
      electricity: +electricity,
      food,
      shopping: +shopping,
      total: total.toFixed(2)
    })
    .then(() => setShowResultButton(true))
    .catch(err => {
      console.error('Error saving to DB:', err);
      alert('Error saving data to database');
    });
  };

  return (
    <div className="tracker-wrapper">
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to bottom right, #a8e6a3, #7ccf90);
        }
        header {
          width: 117.2%;
          background-color: #4caf50;
          color: white;
          padding: 1rem 0;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
        }
        nav {
          width: 117.2%;
          background-color: #e8f5e9;
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding: 1rem;
          font-weight: 600;
        }
        nav a {
          color: #2e7d32;
          text-decoration: none;
        }
        .tracker-container {
          width: 100%;
          max-width: 1200px;
          background-color: #f1fdf3;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          overflow: hidden;
          margin-top: 2rem;
          margin-left: 13rem;
        }

        .tracker-image {
          flex: 1.2;
          background-color: #d5f5dc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .tracker-image img {
          width: 100%;
          max-width: 500px;
          height: auto;
          max-height: 600px;
          border-radius: 12px;
        }

        .tracker-form {
          flex: 1;
          padding: 3rem;
          background-color: #f5fff6;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tracker-form h1 {
          text-align: center;
          color: #2e7d32;
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }

        .tracker-form label {
          display: block;
          margin-top: 1rem;
          font-weight: 600;
          color: #2e7d32;
        }

        .tracker-form input,
        .tracker-form select {
          background-color: white;
          color: #333;
          border: 1px solid #ccc;
          padding: 0.75rem;
          border-radius: 8px;
          width: 100%;
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .tracker-form button {
          margin-top: 2rem;
          width: 100%;
          background-color: #4caf50;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .tracker-form button:hover {
          background-color: #388e3c;
        }

        .result {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 1.2rem;
          color: #2e7d32;
        }
         .back-link{
          margin-top: 2rem;
          }

      `}</style>

      <header>
        <div className="header-inner"> Carbon Tracker </div>
      </header>

      <nav>
        <a href="/Home">About</a>
        <a href="/Home">Track Footprint</a>
        <a href="/Home">Analytics</a>
        <a href="/Home">Goals</a>
      </nav>

      <div className="tracker-container">
        <div className="tracker-image">
          <img src={carbonImage1} alt="Carbon Tracker Visual" />
        </div>
        <div className="tracker-form">
          <h1>Track Your Carbon Emissions</h1>

          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
          />

          <label>Travel (km by car):</label>
          <input type="number" value={travel} onChange={(e) => setTravel(e.target.value)} />

          <label>Electricity Usage (kWh):</label>
          <input type="number" value={electricity} onChange={(e) => setElectricity(e.target.value)} />

          <label>Food Preference:</label>
          <select value={food} onChange={(e) => setFood(e.target.value)}>
            <option value="meat">Meat-based</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>

          <label>Shopping Amount (₹ spent):</label>

          <input type="number" value={shopping} onChange={(e) => setShopping(e.target.value)} />

          <button onClick={calculateEmissions}>Calculate Footprint</button>
          {showResultButton && <button onClick={() => navigate('/result', {
            state: { email, travel, electricity, food, shopping, result }
          })}>View Result</button>}

          {result && <div className="result">Your total carbon footprint is <strong>{result} kg CO₂</strong></div>}

          <center><Link className="back-link" to="/home">← Back to Home</Link></center>
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
