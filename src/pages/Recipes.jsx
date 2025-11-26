import {useEffect, useState } from "react";
import RecipesCard from "./RecipesCard";
import axios from "axios";


export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des recettes :", error);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipesCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
