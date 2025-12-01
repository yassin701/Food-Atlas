import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);



  const navigate = useNavigate();

  // Cloudinary
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
  };

  // Validate & show modal
  const handleAddClick = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!country.trim()) newErrors.country = "Country is required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!steps.trim()) newErrors.steps = "Steps are required.";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required.";
    if (!imageFile) newErrors.image = "Please upload an image.";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowModal(true);
  };

  // Confirm add
  const handleConfirm = async () => {
    setShowModal(false);

    try {
      const imageUrl = await uploadToCloudinary(imageFile);

      const recipeData = {
        name,
        country,
        category,
        description,
        steps,
        ingredients,
        image: imageUrl,
      };

      await axios.post("http://localhost:3001/recipes", recipeData);

      toast.success("Recette ajoutée avec succès ! 🎉");

      setTimeout(() => navigate("/admin"), 500);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout ❌");
    }
  };

  const handleCancel = () => setShowModal(false);

  return (


<div className="flex justify-center mt-12 px-4">
  <form className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
      Add a Recipe
    </h2>

    {/* Inputs */}
    <div className="space-y-4">
      <div>
        <input
          placeholder="Name"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          placeholder="Country"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors.country && <p className="text-red-500 mt-1 text-sm">{errors.country}</p>}
      </div>

      <div>
        <input
          placeholder="Category"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <p className="text-red-500 mt-1 text-sm">{errors.category}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description}</p>}
      </div>

      <div>
        <textarea
          placeholder="Steps"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        {errors.steps && <p className="text-red-500 mt-1 text-sm">{errors.steps}</p>}
      </div>

      <div>
        <textarea
          placeholder="Ingredients"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {errors.ingredients && <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>}
      </div>

      <div>
        <input
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {errors.image && <p className="text-red-500 mt-1 text-sm">{errors.image}</p>}
      </div>
    </div>


        {/* Button */}
        <button
          onClick={handleAddClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Ajouter
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Modal content */}
          <div className="relative bg-white p-8 rounded-xl shadow-lg w-70 text-center z-10">
            <p className="mb-20 text-gray-600">
              Tu es sûr de vouloir ajouter cette recette ?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirm}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Oui
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Toast uniquement pour cette page */}
      <Toaster position="top-center" />
    </div>
  );
}
