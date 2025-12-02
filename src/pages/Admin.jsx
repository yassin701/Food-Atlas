import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, X, AlertTriangle } from "lucide-react";
import RecipesCard from "../Components/RecipeCard";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function Admin() {
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [recipes, setRecipes] = useState([]);

  // State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch all recipes
  const fetchRecipes = () => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        toast.error("Failed to load recipes");
      });
  };

  // Open delete modal
  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecipeToDelete(null);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (recipeToDelete) {
      axios
        .delete(`http://localhost:3001/recipes/${recipeToDelete}`)
        .then(() => {
          // Remove from UI
          setRecipes((prev) =>
            prev.filter((recipe) => recipe.id !== recipeToDelete)
          );

          toast.success("Recipe deleted successfully 🎉");
          closeDeleteModal();
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
          toast.error("Could not delete the recipe");
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

      {/* Recipes Grid */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.map((recipe) => (
          <RecipesCard
            key={recipe.id}
            recipe={recipe}
            isAdmin={true}
            onDelete={() => handleDeleteClick(recipe.id)}
          />
        ))}
      </div>

      {/* === DELETE CONFIRMATION MODAL === */}
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

            {/* Body */}
            <div className="p-6">
              <p className="text-zinc-600">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
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

      
      <Toaster position="top-center" />

    </div>
  );
}
