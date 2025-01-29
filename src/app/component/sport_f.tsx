"use client";

import React, { useState } from "react";
import { Sport } from "../types";

interface Props {
  onAddSport: (sport: Sport) => void;
}

const SportForm: React.FC<Props> = ({ onAddSport }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Individual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return;

    const newSport: Sport = {
      id: Date.now(),
      name,
      image,
      type_of_sport: type,
    };

    onAddSport(newSport);
    setName("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-4">Add New Sport</h2>
      <input
        type="text"
        placeholder="Sport Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      >
        <option value="Individual">Individual</option>
        <option value="Team">Team</option>
      </select>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Sport
      </button>
    </form>
  );
};

export default SportForm;
