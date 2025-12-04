import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, X, AlertTriangle } from "lucide-react";
import RecipesCard from "../Components/RecipeCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Admin() {
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [recipes, setRecipes] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [loading , setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);

  const countries = ["Turkey","Morocco","Mexico","Italy","Japan","Thailand","USA","Lebanon","Spain","India","UK","France","Tunisia"];
  const categories = ["Middle Eastern","Mediterranean","Asian","African","European","American","Fusion"];

  const handleAddIngredient = () => {
    const trimmed = currentIngredient.trim();
    if (trimmed && !recipeToEdit.ingredients.includes(trimmed)) {
      setRecipeToEdit({
        ...recipeToEdit,
        ingredients: [...recipeToEdit.ingredients, trimmed],
      });
      setCurrentIngredient("");
    }
  };

  const handleIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const CLOUD_NAME = "dqronp5bo";
  const UPLOAD_PRESET = "food_uploads";

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url;
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];   
    const imageUrl = await uploadToCloudinary(file);
    setRecipeToEdit(prev => ({ ...prev, image: imageUrl }));
    setRecipes(prevRecipes => prevRecipes.map(r => r.id === recipeToEdit.id ? { ...r, image: imageUrl } : r));
  };

  useEffect(() => { fetchRecipes(); }, []);
  const fetchRecipes = () => {
    axios.get("http://localhost:3001/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleDeleteClick = (id) => { setRecipeToDelete(id); setIsDeleteModalOpen(true); };
  const closeDeleteModal = () => { setIsDeleteModalOpen(false); setRecipeToDelete(null); };

  const confirmDelete = async () => {
    if (!recipeToDelete) return;
    setIsDeleteModalOpen(false); 
    setLoading(true);
    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:3001/recipes/${recipeToDelete}`);
        setRecipes(prev => prev.filter(r => r.id !== recipeToDelete));
        toast.success("Recipe deleted successfully ✅");
      } catch (error) {
        console.error(error);
        toast.error("Could not delete the recipe ❌");
      } finally { setLoading(false); }
    }, 1500);
  };

  const handleEditClick = (recipe) => { setRecipeToEdit({ ...recipe }); setIsEditModalOpen(true); };
  const filteredRecipes = countryFilter === "ALL" ? recipes : recipes.filter((r) => r.country === countryFilter);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="text-gray-800 font-medium">Loading...</span>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 px-6 sm:px-20 py-10 relative">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Admin — Manage Recipes</h1>
          <Link
            to="/admin/add"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-xl shadow-md font-medium transition"
          >
            <Plus className="w-5 h-5" /> Add New Recipe
          </Link>
        </div>

        {/* GRID */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipesCard
              key={recipe.id}
              recipe={recipe}
              isAdmin={true}
              onDelete={() => handleDeleteClick(recipe.id)}
              onEdit={() => handleEditClick(recipe)}
            />
          ))}
        </div>

        {/* DELETE MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" /> Delete Recipe
                </h3>
                <button onClick={closeDeleteModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-gray-700">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </div>
              <div className="px-6 py-4 flex justify-end gap-3 bg-gray-50">
                <button onClick={closeDeleteModal} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {isEditModalOpen && recipeToEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Update Recipe</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* FORM */}
              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={recipeToEdit.name}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>

                {/* Country */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <div
                    className="flex items-center border border-gray-300 rounded-lg cursor-pointer px-4 py-2"
                    onClick={() => setShowCountryList(!showCountryList)}
                  >
                    <span className="flex-1">{recipeToEdit.country || "Select country"}</span>
                    <span className="text-gray-500">▼</span>
                  </div>
                  {showCountryList && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-50">
                      {countries.map((ct, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setRecipeToEdit({ ...recipeToEdit, country: ct });
                            setShowCountryList(false);
                          }}
                        >
                          {ct}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Category */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div
                    className="flex items-center border border-gray-300 rounded-lg cursor-pointer px-4 py-2"
                    onClick={() => setShowCategoryList(!showCategoryList)}
                  >
                    <span className="flex-1">{recipeToEdit.category || "Select category"}</span>
                    <span className="text-gray-500">▼</span>
                  </div>
                  {showCategoryList && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-50">
                      {categories.map((cat, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setRecipeToEdit({ ...recipeToEdit, category: cat });
                            setShowCategoryList(false);
                          }}
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    value={recipeToEdit.description}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, description: e.target.value })}
                  />
                </div>

                {/* Steps */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Steps</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    value={recipeToEdit.steps}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, steps: e.target.value })}
                  />
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg max-h-32 overflow-y-auto bg-gray-50">
                    {recipeToEdit.ingredients.map((item, index) => (
                      <span key={index} className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {item}
                        <X className="w-4 h-4 cursor-pointer" onClick={() => setRecipeToEdit({
                          ...recipeToEdit,
                          ingredients: recipeToEdit.ingredients.filter((_, i) => i !== index)
                        })}/>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add an ingredient..."
                      value={currentIngredient}
                      onChange={(e) => setCurrentIngredient(e.target.value)}
                      onKeyDown={handleIngredientKeyPress}
                      className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-yellow-600 transition"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
                <button
                  onClick={() => {
                    axios.put(`http://localhost:3001/recipes/${recipeToEdit.id}`, recipeToEdit)
                      .then(() => { fetchRecipes(); setIsEditModalOpen(false); });
                  }}
                  className="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <Toaster position="top-center" />
      </div>
    </>
  );
}
