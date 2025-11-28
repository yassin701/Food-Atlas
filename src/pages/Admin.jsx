// import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import RecipesCard from "../Components/RecipeCard";
import axios from "axios";

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


export default function Admin() {
    const [countryFilter, setCountryFilter] = useState("ALL");
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
  axios
    .get("http://localhost:3001/recipes")
    .then((response) => {
      setRecipes(response.data);
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}, []);

const filteredRecipes =
  countryFilter === "ALL"
    ? recipes
    : recipes.filter((recipe) => recipe.country === countryFilter);

  return (
    <div className="min-h-screen bg-stone-50 px-6 sm:px-20 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          Admin — Manage Recipes
        </h1>

        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-lg shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add New Recipe
        </Link>
      </div>

      <div className="mb-6 mx-12 justify-between items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.map((recipe) => (
          <RecipesCard key={recipe.id} recipe={recipe} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}
