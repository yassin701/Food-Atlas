import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    country: "",
    image: "",
    description: "",
    ingredients: "",
    steps: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!form.name || !form.country || !form.category) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(",").map(i => i.trim()), // transformer la string en tableau
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3002/recipes", newRecipe);
      setLoading(false);
      navigate("/recipes"); // retour à la liste après ajout
    } catch (err) {
      setError("Erreur lors de l'ajout de la recette.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Ajouter une recette</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nom de la recette"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie (ex: Asian, European)"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Pays d'origine"
          value={form.country}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingrédients (séparés par des virgules)"
          value={form.ingredients}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="steps"
          placeholder="Étapes de préparation"
          value={form.steps}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Ajout en cours..." : "Ajouter la recette"}
        </button>
      </form>
    </div>
  );
}
