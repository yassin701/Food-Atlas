import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import DeleteRecipe from "../pages/DeleteRecipe";

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
export default function RecipesCard({ recipe, isAdmin }) {
  const [isOpen , setIsOpen]= useState(false)

  const handleDeleteClick = () => {
  setIsOpen(true);
  };
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200">
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-56 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-6 flex justify-between items-start gap-2 flex-col grow">
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

        <div className="flex items-center justify-center text-gray-600 mb-4">
          <FaUtensils className="mr-2 text-yellow-500" />
          <span>{recipe.ingredients.split("\n").length} Ingredients</span>
        </div>

         {!isAdmin && (
          <div className="flex justify-center w-full">
            <Link
              to={`/recipes/${recipe.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2 rounded-md transition"
            >
              View More
            </Link>
          </div>
        )}
        {isAdmin && (
          <div className="flex justify-between mt-3 w-full">
            <Link
              to={`/admin/edit/${recipe.id}`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
            >
              <Pencil className="w-4 h-4" />
              Update
            </Link>

            <button
              onClick={()=>handleDeleteClick()}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}

        {isOpen && (
          <DeleteRecipe id={recipe.id} isOpen={setIsOpen} />
        )}
      </div>
    </div>
      
  );
}
