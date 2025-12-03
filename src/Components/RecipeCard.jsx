import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";


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
  return codes[countryName] || "US";
};



// 1. Added onDelete to props
export default function RecipesCard({ recipe, isAdmin, onDelete , onEdit}) {

  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="overflow-hidden rounded-t-2xl h-56 shrink-0">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h5 className="text-xl font-serif font-bold text-zinc-950 line-clamp-1">
              {recipe.name}
            </h5>
            <span className="text-xs font-medium uppercase tracking-wider text-yellow-600">
              {recipe.category}
            </span>
          </div>
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

        <div className="flex items-center text-gray-600 mb-6">
          <FaUtensils className="mr-2 text-yellow-500" />
          
        </div>

        {/* Push buttons to the bottom */}
        <div className="mt-auto w-full">

          {/* 2. Logic Fixed: If NOT Admin, show View More */}
          {!isAdmin && (
            <Link
              to={`/recipes/${recipe.id}`}
              className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition shadow-md"
            >
              View More
            </Link>
          )}

          {/* 3. Logic Fixed: If IS Admin, show Edit and Delete */}
          {isAdmin && (
            <div className="flex justify-between gap-3 w-full">
              <button
                onClick={() => onEdit(recipe)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-md text-sm font-medium transition shadow-sm"
              >
                <Pencil className="w-4 h-4" />
                Update
              </button>


              {/* Changed from Link to Button to trigger the Modal */}
              <button
                onClick={onDelete}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-md text-sm font-medium transition shadow-sm cursor-pointer"
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