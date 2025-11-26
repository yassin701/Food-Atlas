import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRecipeById(id)
      .then(data => {
        setRecipe(data || null); // fallback null
        setError(false);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-lg font-semibold">
        Recette non trouvée !
      </p>
    );

  if (!recipe)
    return (
      <p className="text-gray-500 text-center mt-20 text-lg">
        Chargement...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate("/recipes")}
        className="mb-6 px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center gap-2"
      >
        ← Retour
      </button>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.name || "Recipe Image"} 
            className="w-full h-70 object-cover"
          />
        )}

        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
            {recipe.name || "Recette sans nom"}
          </h1>
          <p className="text-gray-500 mb-4">
            {(recipe.country || "Pays inconnu")} — {(recipe.category || "Catégorie inconnue")}
          </p>
          <p className="text-gray-700 mb-6">{recipe.description || "Pas de description disponible."}</p>

          {/* Ingrédients */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Ingrédients</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {(Array.isArray(recipe.ingredients) ? recipe.ingredients : []).map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Étapes */}
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Étapes</h3>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {recipe.steps || "Pas d'instructions disponibles."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
