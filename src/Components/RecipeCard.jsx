// Import React and necessary icons & components
import React from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

// Helper function: returns country code based on country name
// This code is used to generate the flag image URL
const getCountryCode = (countryName) => {
  const codes = {
    Morocco: "MA",
    Mexico: "MX",
    Italy: "IT",
    Japan: "JP",
    Thailand: "TH",
    USA: "US",
    Lebanon: "LB",
    Spain: "ES",
    India: "IN",
    UK: "GB",
    Turkey: "TR",
    France: "FR",
    Tunisia: "TN",
  };
  return codes[countryName] || "US"; // Default: US if not found
};

// RecipesCard Component
// Props:
// - recipe: object that contains recipe info
// - isAdmin: if true → show edit/delete buttons
// - onDelete: function that triggers delete modal
export default function RecipesCard({ recipe, isAdmin, onDelete }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">

      {/* Recipe Image */}
      <div className="overflow-hidden rounded-t-2xl h-56 shrink-0">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-6 flex flex-col grow">

        {/* Recipe Title + Category + Country Flag */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            {/* Recipe Name */}
            <h5 className="text-xl font-serif font-bold text-zinc-950 line-clamp-1">
              {recipe.name}
            </h5>

            {/* Category */}
            <span className="text-xs font-medium uppercase tracking-wider text-yellow-600">
              {recipe.category}
            </span>
          </div>

          {/* Country flag */}
          <div className="shrink-0">
            <img
              src={`https://flagsapi.com/${getCountryCode(
                recipe.country
              )}/flat/64.png`}
              alt={recipe.country}
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Ingredients Count */}
        <div className="flex items-center text-gray-600 mb-6">
          <FaUtensils className="mr-2 text-yellow-500" />
          {/* Split the ingredients by line and count them */}
          <span>{recipe.ingredients.split("\n").length} Ingredients</span>
        </div>

        {/* Buttons Section - goes to the bottom */}
        <div className="mt-auto w-full">

          {/* If not admin → show View More button */}
          {!isAdmin && (
            <Link
              to={`/recipes/${recipe.id}`}
              className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition shadow-md"
            >
              View More
            </Link>
          )}

          {/* If admin → show Update & Delete buttons */}
          {isAdmin && (
            <div className="flex justify-between gap-3 w-full">

              {/* Update Button */}
              <Link
                to={`/admin/edit/${recipe.id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-md text-sm font-medium transition shadow-sm"
              >
                <Pencil className="w-4 h-4" />
                Update
              </Link>

              {/* Delete Button (calls onDelete instead of navigating) */}
              <button
                onClick={onDelete}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-md text-sm font-medium transition shadow-sm cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
      
  );
}
