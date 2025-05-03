import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Color Scheme for Pie Chart and Bar Chart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const ResultPage = () => {
  const { state } = useLocation();
  if (!state) return <div>No data found</div>;

  const { email, travel, electricity, food, shopping, result } = state;

  const pieData = [
    { name: 'Travel', value: travel * 0.21 },
    { name: 'Electricity', value: electricity * 0.92 },
    { name: 'Food', value: { meat: 3, vegetarian: 1.7, vegan: 1.5 }[food] * 30 },
    { name: 'Shopping', value: shopping * 0.06 }
  ];

  useEffect(() => {
    localStorage.setItem("latestResult", JSON.stringify(state));
  }, [state]);

  return (
    <div className="result-wrapper">
      <header>
        <div className="header-inner"> Carbon Tracker </div>
      </header>

      <nav>
        <a href="/Home">About</a>
        <a href="/Home">Track Footprint</a>
        <a href="/Home">Analytics</a>
        <a href="/Home">Goals</a>
      </nav>

      <div className="result-container">
        <h2 className="result-heading">Carbon Emission Breakdown</h2>

        {/* Updated: Entire message in Green */}
        <p className="result-description">
          <span className="green-text"><strong>{email}</strong>'s total carbon footprint: <strong>{result} kg CO₂</strong></span>
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <h3 className="chart-heading">Category-wise Emissions (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pieData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>

        <div className="back-link">
          <Link to="/home">← Back to Home</Link>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to bottom right, #a8e6a3, #7ccf90);
        }

        header {
         width: 111.8%;
          background-color: #4caf50;
          color: white;
          padding: 1rem 0;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
        }

        nav {
          width: 111.8%;
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

        .result-container {
          width: 100%;
          max-width: 1200px;
          background-color: #f1fdf3;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          margin: 2rem auto;
          margin-left: 10rem;
        }

        .result-heading {
          text-align: center;
          color: #2e7d32;
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }

        .result-description {
          text-align: center;
          font-size: 18px;
          margin-bottom: 2rem;
        }

        /* New Class: Green text color */
        .green-text {
          color: #388e3c; /* Green color */
        }

        .chart-heading {
          text-align: center;
          color: #2e7d32;
          margin-top: 2rem;
          font-size: 1.5rem;
        }

        .back-link {
          margin-top: 2rem;
          font-size: 1.2rem;
        }

        .back-link a {
          text-decoration: none;
          color: #2e7d32;
        }

        .back-link a:hover {
          text-decoration: underline;
        }

      `}</style>
    </div>
  );
};

export default ResultPage;
