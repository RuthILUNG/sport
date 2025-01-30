import React from "react";
import { Sport } from "../types";

interface SportsListProps {
  sports: Sport[];
  onDeleteSport: (id: number) => void;
  onEditSport: (sport: Sport) => void;
}

const SportsList: React.FC<SportsListProps> = ({ sports, onDeleteSport, onEditSport }) => {
  return (
    <div className="mt-6 space-y-4">
      {sports.map((sport) => (
        <div key={sport.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
          <div className="flex items-center">
         
            <img
              src={sport.image}
              alt={sport.name}
              className="w-20 h-20 object-cover rounded-full mr-4" 
            />
            <div>
              <h3 className="text-lg font-bold">{sport.name}</h3>
              <p>{sport.type_of_sport}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => onEditSport(sport)} 
              className="mr-2 text-green-500 hover:text-green-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteSport(sport.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportsList;
