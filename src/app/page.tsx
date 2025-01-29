"use client";

import React, { useState, useEffect } from "react";
import { Sport } from "./types";
import sportsData from "./Component/data/data.json";
import SportsList from "./Component/sport_det";
import SportForm from "./Component/sport_f";

const App: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setSports(sportsData);
  }, []);

  const handleAddSport = (newSport: Sport) => {
    setSports([...sports, newSport]);
  };

  const handleDeleteSport = (id: number) => {
    setSports(sports.filter((sport) => sport.id !== id));
  };

  const handleUpdateSport = (updatedSport: Sport) => {
    setSports(
      sports.map((sport) => (sport.id === updatedSport.id ? updatedSport : sport))
    );
  };

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Sports Dashboard</h1>
        <input
          type="text"
          placeholder="Search sports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SportForm onAddSport={handleAddSport} />
        <SportsList
          sports={filteredSports}
          onDeleteSport={handleDeleteSport}
          onUpdateSport={handleUpdateSport}
        />
      </div>
    </div>
  );
};

export default App;
