import React, { useEffect, useState } from 'react';
import { FaLeaf, FaBurn, FaCar, FaShoppingBag, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

import image1 from './assets/image3.avif';
import green2 from './assets/image4.avif';
import green3 from './assets/image1.png';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userEmissions, setUserEmissions] = useState(500);
  const maxEmissions = 1500;
  const [goalMessage,] = useState('');
  const [goalSet, setGoalSet] = useState(false);

  const images = [image1, green2, green3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your Weekly and Monthly Carbon Footprint Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`You've used ${userEmissions} kg CO₂ out of ${maxEmissions} kg.`, 20, 30);
    const percentageUsed = ((userEmissions / maxEmissions) * 100).toFixed(2);
    doc.text(`You've used: ${percentageUsed}% of the 1500 kg/month.`, 20, 40);

    // Pie Chart
    const pieCanvas = document.getElementById('pie-chart');
    const pieImg = await html2canvas(pieCanvas).then(canvas => canvas.toDataURL('image/png'));
    doc.addImage(pieImg, 'PNG', 20, 50, 80, 80);

    // Bar Chart
    const barCanvas = document.getElementById('bar-chart');
    const barImg = await html2canvas(barCanvas).then(canvas => canvas.toDataURL('image/png'));
    doc.addImage(barImg, 'PNG', 120, 50, 80, 80);

    doc.save('carbon_footprint_report.pdf');
  };

  const pieData = {
    labels: ['Used', 'Remaining'],
    datasets: [{
      data: [userEmissions, maxEmissions - userEmissions],
      backgroundColor: ['#4caf50', '#c8e6c9'],
    }],
  };

  const barData = {
    labels: ['Used', 'Remaining'],
    datasets: [{
      label: 'kg CO₂',
      data: [userEmissions, maxEmissions - userEmissions],
      backgroundColor: ['#4caf50', '#c8e6c9'],
    }],
  };

  const percentageUsed = ((userEmissions / maxEmissions) * 100).toFixed(2);

  return (
    <div className="homepage">
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to bottom right, #a8e6a3, #7ccf90);
          overflow-x: hidden;
        }

        .homepage header {
          background-color: #4caf50;
          color: white;
          width: 130%;
          padding: 1.5rem;
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .slideshow-fullscreen {
          width: 140%;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .slideshow-fullscreen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          transition: opacity 1s ease-in-out;
        }

        .homepage nav {
          background-color: #e8f5e9;
          width: 130%;
          padding: 1rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-weight: 600;
          color: #2e7d32;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .homepage nav a {
          text-decoration: none;
          color: #2e7d32;
          transition: color 0.3s ease;
        }

        .homepage nav a:hover {
          color: #388e3c;
        }

        .homepage main {
          width: 1050px;
          margin: 2rem auto;
          padding: 0 3rem;
          margin-left: 15%;
        }

        .homepage section {
          background-color: white;
          width: 100%;
          max-width: 1100px;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }

        .homepage section h2 {
          font-size: 1.5rem;
          color: #2e7d32;
          margin-bottom: 0.5rem;
        }

        .homepage section p, .homepage section ul {
          color: #444;
          font-size: 1rem;
        }

        .homepage ul {
          list-style-type: disc;
          padding-left: 1.2rem;
        }

        .homepage ul li {
          margin-bottom: 0.5rem;
        }

        .homepage button {
          margin-top: 1rem;
          padding: 0.8rem 1.5rem;
          background-color: #4caf50;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .homepage button:hover {
          background-color: #388e3c;
        }

        .homepage footer {
          background-color: #e8f5e9;
          padding: 1rem;
          width: 130%;
          text-align: center;
          color: #2e7d32;
          font-size: 0.85rem;
        }

        .emission-input-container {
          background-color: #e0f7fa;
          border-left: 8px solid #4db6ac;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          display: flex;
        }

        .emission-input-container label {
          font-weight: bold;
          color: #00695c;
          display: block;
          margin-bottom: 0.5rem;
        }

        .emission-input-container input {
          border-radius: 8px;
          background-color: #f5fff6;
          border: 1px solid #ccc;
          width: 140px;
          color:black;
          font-size: 1rem;
          margin-left: 2rem;
        }

        .percentage-highlight {
          background-color: #e0f7fa;
          border-left: 8px solid #4db6ac;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          display: flex;
        }

        .chart-preview {
          position: absolute;
          left: -9999px;
          top: -9999px;
        }
      `}</style>

      <header>Welcome to Your Carbon Footprint Tracker</header>

      <nav>
        <a href="#about">About</a>
        <a href="#track">Track Footprint</a>
        <a href="#analytics">Analytics</a>
        <a href="#goals">Goals</a>
      </nav>

      <div className="slideshow-fullscreen">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Slide"
            style={{
              opacity: currentSlide === index ? 1 : 0
            }}
          />
        ))}
      </div>

      <main>
        <section id="about">
          <h2>🌿 What is Carbon Footprint?</h2>
          <p>
            Your carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane)
            that are generated by your actions. This platform helps you track and reduce your impact.
          </p>
        </section>

        <section id="track">
          <h2>📊 Track Your Activities</h2>
          <ul>
            <li><FaCar style={{ color: "#4caf50", marginRight: "8px" }} />Travel (car, bus, train, air)</li>
            <li><FaBurn style={{ color: "#4caf50", marginRight: "8px" }} />Electricity & Gas usage</li>
            <li><FaUtensils style={{ color: "#4caf50", marginRight: "8px" }} />Food habits (meat, vegetarian, vegan)</li>
            <li><FaShoppingBag style={{ color: "#4caf50", marginRight: "8px" }} />Shopping behavior</li>
          </ul>
          <button onClick={() => navigate('/tracker')}>
            <FaLeaf /> Start Tracking Now
          </button>
        </section>

        <section id="analytics">
          <h2>📈 Your Emissions Overview</h2>
          <p>See weekly and monthly breakdowns of your carbon footprint.</p>

          <div className="emission-input-container">
            <label htmlFor="emissionInput">Enter your CO₂ usage (kg):</label>
            <input
              id="emissionInput"
              type="number"
              value={userEmissions}
              onChange={e => setUserEmissions(Number(e.target.value))}
            />
          </div>

          <p className="percentage-highlight">
            You've used: {percentageUsed}% of the 1500 kg/month.
          </p>

          <button onClick={generatePDF}>Download Results (PDF)</button>

          {/* Hidden Charts for PDF */}
          <div className="chart-preview">
            <div id="pie-chart"><Pie data={pieData} /></div>
            <div id="bar-chart"><Bar data={barData} /></div>
          </div>
        </section>
        <section id="goals">
          <h2>🎯 Set & Achieve Goals</h2>
          <p>Set reduction goals and earn green points for reducing your emissions.</p>

          <div style={{ background: "#e8f5e9", padding: "1rem", borderRadius: "1rem", marginTop: "1rem" }}>
            <label htmlFor="goalInput" style={{ fontWeight: "bold", color: "#2e7d32" }}>
              Set your target CO₂ usage (kg):
            </label>
            <input
              id="goalInput"
              type="number"
              style={{ background: "#e8f5e9", color: "black", marginLeft: "1rem", padding: "0.5rem", borderRadius: "0.5rem" }}
              placeholder="e.g. 1200"
              onChange={(e) => {
                const target = Number(e.target.value);
                const reduction = userEmissions - target;
                const percent = ((reduction / userEmissions) * 100).toFixed(2);
                setGoalMessage(`Great! You aim to reduce by ${reduction} kg (${percent}%)`);
                setGoalSet(true); // Mark the goal as set
              }}
            />
          </div>

          <button
            style={{
              marginTop: "1rem",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#4caf50",
              color: "white",
              fontWeight: "600",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onClick={() => setGoalSet(true)}
          >
            Set Goals
          </button>

          {/* Displaying goal message, Green Points System, and Tips */}
          {goalSet && (
            <>
              <div style={{ marginTop: "1rem", backgroundColor: "#fff3e0", padding: "1rem", borderRadius: "1rem" }}>
                <p style={{ fontWeight: "bold", color: "#ef6c00" }}>🏆 Green Points System</p>
                <ul>
                  <li>Reduce 50 kg = +5 Green Points</li>
                  <li>Reduce 100 kg = +10 Green Points</li>
                  <li>Achieve 3 monthly goals = 🌱 Eco Badge</li>
                </ul>
              </div>

              <div style={{ marginTop: "1rem", backgroundColor: "#e3f2fd", padding: "1rem", borderRadius: "1rem" }}>
                <p style={{ fontWeight: "bold", color: "#1976d2" }}>💡 Tips to Lower Your Carbon Footprint:</p>
                <ul>
                  <li>🚶‍♀️ Walk or bike instead of using the car</li>
                  <li>💡 Switch to energy-efficient appliances</li>
                  <li>🥦 Eat more plant-based meals</li>
                  <li>♻️ Buy less and choose sustainable products</li>
                </ul>
              </div>
            </>
          )}
        </section>


      </main>

      <footer>
        © 2025 Carbon Tracker | Go Green 🌱
      </footer>
    </div>
  );
};

export default HomePage;
