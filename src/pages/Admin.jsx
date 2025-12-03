import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, X, AlertTriangle } from "lucide-react";
import RecipesCard from "../Components/RecipeCard";
import axios from "axios";

export default function Admin() {
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [recipes, setRecipes] = useState([]);




  // DELETE MODAL
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // EDIT MODAL
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  // For dynamic ingredients input
  const [currentIngredient, setCurrentIngredient] = useState("");

  // ---------------- INGREDIENT HANDLERS ---------------- //
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
  
  
    return res.data.secure_url;  // ✔ return the uploaded image URL

    }
const handleChange =async (e)=>{
      const file = e.target.files[0];   
        const imageUrl = await uploadToCloudinary(file);
        
          setRecipeToEdit(prev => ({
    ...prev,
      image: imageUrl
  }));
return imageUrl

}





  // ---------------- FETCH RECIPES ---------------- //
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  console.log(recipes)


  // ---------------- DELETE ---------------- //
  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecipeToDelete(null);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      axios
        .delete(`http://localhost:3001/recipes/${recipeToDelete}`)
        .then(() => {
          setRecipes((prev) => prev.filter((r) => r.id !== recipeToDelete));
          closeDeleteModal();
        })
        .catch(() => alert("Could not delete the recipe."));
    }
  };

  // ---------------- EDIT ---------------- //
  const handleEditClick = (recipe) => {
    console.log("r",recipe);
    
    setRecipeToEdit({ ...recipe });
    setIsEditModalOpen(true);
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

      {/* GRID */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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

      {/* ---------------- DELETE MODAL ---------------- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

            <div className="bg-stone-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Delete Recipe
              </h3>
              <button
                onClick={closeDeleteModal}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-zinc-700">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>
            </div>

            <div className="bg-stone-50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg text-zinc-600 hover:bg-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {isEditModalOpen && recipeToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update Recipe</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-500 hover:text-zinc-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-4">
              
              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={recipeToEdit.name}
                  onChange={(e) =>
                    setRecipeToEdit({ ...recipeToEdit, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* COUNTRY */}
              <div>
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  value={recipeToEdit.country}
                  onChange={(e) =>
                    setRecipeToEdit({ ...recipeToEdit, country: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={recipeToEdit.category}
                  onChange={(e) =>
                    setRecipeToEdit({ ...recipeToEdit, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Description"
                  className="w-full border p-3 rounded-lg resize-none"
                  value={recipeToEdit.description}
                  onChange={(e) =>
                    setRecipeToEdit({
                      ...recipeToEdit,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* STEPS */}
              <div>
                <label className="text-sm font-medium">Steps</label>
                <textarea
                  placeholder="Steps"
                  className="w-full border p-3 rounded-lg resize-none"
                  value={recipeToEdit.steps}
                  onChange={(e) =>
                    setRecipeToEdit({
                      ...recipeToEdit,
                      steps: e.target.value,
                    })
                  }
                />
              </div>

              {/* INGREDIENTS */}
              <div>
                <label className="text-sm font-medium">Ingredients</label>

                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-lg">
                  {recipeToEdit.ingredients.map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setRecipeToEdit({
                            ...recipeToEdit,
                            ingredients: recipeToEdit.ingredients.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                      />
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
                    className="flex-1 border p-3 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <label className="text-sm font-medium">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>handleChange(e)}
                  // onChange={(e) =>
                  //   console.log(e.target.files[0])
                    
                    // setRecipeToEdit({
                    //   ...recipeToEdit,
                    //   Image: e.target.files[0],
                    // })
                  // }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-200"
              >
                Cancel
              </button>

              <button

                onClick={() => {
                  axios
                    .put(`http://localhost:3001/recipes/${recipeToEdit.id}`, recipeToEdit)
                    .then(() => {
                      fetchRecipes();
                      setIsEditModalOpen(false);
                    });
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
