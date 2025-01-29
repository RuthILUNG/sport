"use client";

import React from "react";
import { Sport } from "../types";

interface Props {
  sports: Sport[];
  onDeleteSport: (id: number) => void;
  onUpdateSport: (sport: Sport) => void;
}

const SportsList: React.FC<Props> = ({ sports, onDeleteSport, onUpdateSport }) => {
  return (
    <div className="mt-6">
      {sports.length === 0 ? (
        <p className="text-center text-gray-500">No sports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sports.map((sport) => (
            <div key={sport.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{sport.name}</h3>
              <p className="text-gray-500">Type: {sport.type_of_sport}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => onDeleteSport(sport.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    const newName = prompt("Enter new name:", sport.name);
                    if (newName) {
                      onUpdateSport({ ...sport, name: newName });
                    }
                  }}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SportsList;
