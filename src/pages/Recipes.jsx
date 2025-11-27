import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [countryFilter, setCountryFilter] = useState("ALL");
  const navigate = useNavigate();

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
    <div className="p-6">
      <div className="mb-6 mx-12 flex justify-between items-center">
        <button onClick={() => navigate("/")} className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center gap-2">
          ← Retour
        </button>

        <select className="border border-gray-300 p-2 rounded-lg shadow-sm" value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}>
          <option value="ALL">All Countries</option>
          <option value="Morocco">Morocco</option>
          <option value="Italy">Italy</option>
          <option value="Spain">Spain</option>
          <option value="France">France</option>
          <option value="Mexico">Mexico</option>
        </select>
      </div>

      <div className="mb-6 mx-12 justify-between items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
