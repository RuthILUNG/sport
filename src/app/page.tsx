"use client";

import React, { useState, useEffect } from "react";
import { Sport } from "./types";
import sportsData from "../app/component/data/data.json";
import SportsList from "../app/component/sport_det";
import SportForm from "../app/component/sport_f";

const App: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false); 
  const [editSport, setEditSport] = useState<Sport | null>(null); 

  useEffect(() => {
    setSports(sportsData);
  }, []);

  const handleAddSport = (newSport: Sport) => {
    setSports([...sports, newSport]);
    setShowForm(false); 
  };

  const handleDeleteSport = (id: number) => {
    setSports(sports.filter((sport) => sport.id !== id));
  };

  const handleUpdateSport = (updatedSport: Sport) => {
    setSports(
      sports.map((sport) => (sport.id === updatedSport.id ? updatedSport : sport))
    );
    setEditSport(null); 
  };

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditForm = (sport: Sport) => {
    setEditSport(sport);
    setShowForm(true); 
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('https://www.stormers.co.za/wp-content/uploads/2025/01/Screenshot-2025-01-25-210146.png')",  
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment:"fixed",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "40rem",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",  
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#008000",
            marginBottom: "1.5rem",
          }}
        >
          Sports Dashboard
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search sports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.375rem",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "1rem",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
          onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
        />

        
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#008000",
            color: "#FFF",
            borderRadius: "0.375rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginBottom: "1.5rem",
          }}
        >
          {showForm ? "Cancel" : "Add Sport"}
        </button>

        
        {showForm && !editSport && <SportForm onAddSport={handleAddSport} />}

        
        {showForm && editSport && (
          <SportForm
            sport={editSport} 
            onAddSport={handleUpdateSport} 
            onCancel={() => setShowForm(false)} 
          />
        )}

       
        <SportsList
          sports={filteredSports} // Pass sports to SportsList
          onDeleteSport={handleDeleteSport}
          onEditSport={openEditForm} // Pass the function to handle editing
        />
      </div>
    </div>
  );
};

export default App;
