import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/products'); // Change this to your desired route
  };

  return (
    <div style={{ display:'flex', justifyContent:'space-around', marginTop:32 }}>
      <section className="hero-card">
        <h1 className="hero-title">E-SPORTS<br/>EQUIPMENT STORE</h1>
        <p className="hero-sub">Expertise you find the best e-sports gear for competitive gaming.</p>
        <button className="btn" onClick={handleGetStarted}>GET STARTED</button>
      </section>
      <section style={{ display:'flex', justifyContent:'space-around', marginTop:32 }}>
        {/* Empty section for now */}
      </section>
    </div>
  );
}