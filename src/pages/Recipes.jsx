import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
        <button
          onClick={() => navigate("/")}
          className="group mb-8 inline-flex items-center gap-2 text-zinc-600 hover:text-yellow-600 transition-colors duration-200"
        >
          <div className="p-2 bg-white border border-zinc-200 rounded-full group-hover:border-yellow-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Home</span>
        </button>

        <select
          className="border border-zinc-200 p-2.5 rounded-lg bg-white shadow-sm text-zinc-600 group-hover:border-yellow-500 group-hover:text-yellow-600
          transition-colors duration-200 cursor-pointer"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
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
          <RecipeCard key={recipe.id} recipe={recipe} isAdmin={false}/>
        ))}
      </div>
    </div>
  );
}
