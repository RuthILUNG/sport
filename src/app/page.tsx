"use client";

import React, { useState, useEffect } from "react";
import { Sport } from "./types";
import sportsData from "../app/component/data/data.json";
import SportsList from "../app/component/sport_det";
import SportForm from "../app/component/sport_f";

const App: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false); // Controls form visibility
  const [editSport, setEditSport] = useState<Sport | null>(null); // Store sport being edited

  useEffect(() => {
    setSports(sportsData);
  }, []);

  const handleAddSport = (newSport: Sport) => {
    setSports([...sports, newSport]);
    setShowForm(false); // Hide form after adding
  };

  const handleDeleteSport = (id: number) => {
    setSports(sports.filter((sport) => sport.id !== id));
  };

  const handleUpdateSport = (updatedSport: Sport) => {
    setSports(
      sports.map((sport) => (sport.id === updatedSport.id ? updatedSport : sport))
    );
    setEditSport(null); // Close modal after updating
  };

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditForm = (sport: Sport) => {
    setEditSport(sport);
    setShowForm(true); // Show form when editing
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Sports Dashboard</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search sports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Toggle Add Sport Form */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add Sport"}
        </button>

        {/* Conditionally Render Add Sport Form */}
        {showForm && !editSport && <SportForm onAddSport={handleAddSport} />}

        {/* Conditionally Render Edit Form */}
        {showForm && editSport && (
          <SportForm
            sport={editSport} // Pass the selected sport to the form for editing
            onAddSport={handleUpdateSport} // Use the update function for editing
            onCancel={() => setShowForm(false)} // Close the form when canceled
          />
        )}

        {/* Sports List */}
        <SportsList
          sports={filteredSports} // Pass sports to SportsList
          onDeleteSport={handleDeleteSport}
          onEditSport={openEditForm} // Pass function to handle editing
        />
      </div>
    </div>
  );
};

export default App;
