import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";

const Details = () => {
  const { id } = useParams(); // id من URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError("Erreur: impossible de récupérer la recette");
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full rounded-xl shadow-md mb-6"
      />
      <p className="text-gray-700 mb-4">{recipe.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Ingrédients</h2>
      <ul className="list-disc ml-6 mb-4">
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Étapes</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {recipe.steps}
      </pre>
    </div>
  );
};

export default Details;
