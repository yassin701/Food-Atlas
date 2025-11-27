import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";
import { ArrowLeft, Clock, MapPin, ChefHat, Info } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  // Helper to map country names to ISO 2-letter codes (Same as Home)
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

  useEffect(() => {
    getRecipeById(id)
      .then((data) => {
        setRecipe(data || null);
        setError(false);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Info className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-zinc-950 font-serif text-2xl">Recipe not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-yellow-600 hover:underline"
          >
            Return to recipes
          </button>
        </div>
      </div>
    );

  if (!recipe)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-zinc-500 font-serif text-xl animate-pulse">
          Loading Food Atlas...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-6 px-6 sm:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/recipes")}
          className="group mb-8 inline-flex items-center gap-2 text-zinc-600 hover:text-yellow-600 transition-colors duration-200"
        >
          <div className="p-2 bg-white border border-zinc-200 rounded-full group-hover:border-yellow-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Recipes</span>
        </button>

        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
          {/* Hero Image */}
          {recipe.image && (
            <div className="relative h-80 sm:h-96 w-full">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase bg-yellow-500 text-white rounded-md">
                  {recipe.category || "Cuisine"}
                </span>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-2 shadow-sm">
                  {recipe.name}
                </h1>
              </div>
            </div>
          )}

          <div className="p-8 sm:p-12">
            {/* Meta Data Row */}
            <div className="flex flex-wrap gap-6 border-b border-zinc-100 pb-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-50 rounded-full">
                  <img
                    src={`https://flagsapi.com/${getCountryCode(
                      recipe.country
                    )}/flat/64.png`}
                    alt={recipe.country}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">
                    Origin
                  </p>
                  <p className="text-zinc-900 font-medium">{recipe.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-50 rounded-full text-yellow-600">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">
                    Difficulty
                  </p>
                  <p className="text-zinc-900 font-medium">Medium</p>{" "}
                  {/* Static example, or dynamic if in DB */}
                </div>
              </div>

              {/* Description */}
              <div className="w-full mt-2">
                <p className="text-zinc-600 italic text-lg leading-relaxed">
                  "{recipe.description || "No description available."}"
                </p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Ingredients Column */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-serif font-bold text-zinc-950 mb-4 flex items-center gap-2">
                  Ingredients
                </h3>
                <div className="px-6 rounded-lg">
                  <ul className="space-y-4">
                    {/* 1. Check if it's a string, if so, split by newline. 
      2. If it's already an array, use it. 
      3. Fallback to empty array. */}
                    {(typeof recipe.ingredients === "string"
                      ? recipe.ingredients.split("\n")
                      : Array.isArray(recipe.ingredients)
                      ? recipe.ingredients
                      : []
                    ).map((ing, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-zinc-700"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0" />
                        {/* Remove the "- " from the text since we have the yellow dot now */}
                        <span className="leading-snug">
                          {ing.replace(/^- /, "")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions Column */}
              {/* Instructions Column */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-serif font-bold text-zinc-950 mb-6">
                  Preparation
                </h3>
                <div className="flex flex-col gap-6">
                  {/* 1. Split steps by new line 
                     2. Filter out empty lines to avoid blank steps
                     3. Map to create a layout for Number + Text
                  */}
                  {(recipe.steps || "")
                    .split("\n")
                    .filter((step) => step.trim() !== "")
                    .map((step, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        {/* The Number - styled with the same yellow */}
                        <span className="font-serif font-bold text-yellow-500 text-lg leading-none shrink-0 mt-1">
                          {i + 1}.
                        </span>

                        {/* The Text - stripping the original "1. " from the string if it exists */}
                        <p className="text-zinc-600 text-lg leading-relaxed">
                          {step.replace(/^\d+\.\s*/, "")}
                        </p>
                      </div>
                    ))}

                  {/* Fallback if string is empty */}
                  {!recipe.steps && (
                    <p className="text-zinc-500 italic">
                      No instructions available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
