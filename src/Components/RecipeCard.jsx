import React from "react";
export default function RecipesCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      
      {/* IMAGE + DATE BADGE */}
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-56 object-cover"
        />

        <span className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow">
          {recipe.date || "Jan 14, 2021"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 italic">
          {recipe.name}
        </h2>

        <p className="text-gray-600 mb-6">
          {recipe.description.substring(0, 110)}...
        </p>

        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md transition">
          View More
        </button>
      </div>

    </div>
  );
}