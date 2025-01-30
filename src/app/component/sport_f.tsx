import React, { useState, useEffect } from "react";
import { Sport } from "../types";

interface SportFormProps {
  onAddSport: (sport: Sport) => void;
  onCancel?: () => void;
  sport?: Sport; // This is optional when editing
}

const SportForm: React.FC<SportFormProps> = ({ onAddSport, onCancel, sport }) => {
  const [name, setName] = useState<string>(sport ? sport.name : "");
  const [image, setImage] = useState<string>(sport ? sport.image : "");
  const [sportType, setSportType] = useState<string>(sport ? sport.type_of_sport : "");

  useEffect(() => {
    if (sport) {
      setName(sport.name);
      setImage(sport.image);
      setSportType(sport.type_of_sport);
    }
  }, [sport]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSport = {
      id: sport ? sport.id : Date.now(), // If editing, keep the same id, otherwise generate a new one
      name,
      image,
      type_of_sport: sportType, // Correct field name
    };

    onAddSport(newSport); // Add or update sport
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{sport ? "Edit Sport" : "Add Sport"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="mb-4">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sport Type</label>
            <input
              type="text"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between mt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {sport ? "Update Sport" : "Add Sport"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SportForm;
