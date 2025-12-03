import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, X, AlertTriangle } from "lucide-react"; // Added Icons
import RecipesCard from "../Components/RecipeCard";
import axios from "axios";

export default function Admin() {
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [recipes, setRecipes] = useState([]);

  // State for the Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  // 1. Open the modal and store the ID to be deleted
  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // 2. Close modal without deleting
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecipeToDelete(null);
  };

  // 3. Confirm deletion
  const confirmDelete = () => {
    if (recipeToDelete) {
      axios
        .delete(`http://localhost:3001/recipes/${recipeToDelete}`)
        .then(() => {
          // Remove from UI immediately (Optimistic update)
          setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe.id !== recipeToDelete)
          );
          closeDeleteModal();
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
          alert("Could not delete the recipe.");
        });
    }
  };

  const filteredRecipes =
    countryFilter === "ALL"
      ? recipes
      : recipes.filter((recipe) => recipe.country === countryFilter);

  return (
    <div className="min-h-screen bg-stone-50 px-6 sm:px-20 py-10 relative">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          Admin — Manage Recipes
        </h1>

        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-lg shadow-lg transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Recipe
        </Link>
      </div>

      <div className="mb-6 justify-between items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.map((recipe) => (
          <RecipesCard
            key={recipe.id}
            recipe={recipe}
            isAdmin={true} // Changed to true so the card knows to show controls
            onDelete={() => handleDeleteClick(recipe.id)} // Pass the handler
          />
        ))}
      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">

            {/* Modal Header */}
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Delete Recipe
              </h3>
              <button
                onClick={closeDeleteModal}
                className="text-zinc-400 hover:text-zinc-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-zinc-600">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>
            </div>

            {/* Modal Footer (Buttons) */}
            <div className="bg-stone-50 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg text-zinc-600 font-medium hover:bg-zinc-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 shadow-md flex items-center gap-2 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
