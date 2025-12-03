import { useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react"; // only needed icons
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [steps, setSteps] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [showCountryList, setShowCountryList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
    
  const countries = [
  "Turkey", "Morocco", "Mexico", "Italy", "Japan",
  "Thailand", "USA", "Lebanon", "Spain", "India",
  "UK", "France", "Tunisia"
];

const categories = [
  "Middle Eastern",
  "Mediterranean",
  "Asian",
  "African",
  "European",
  "American",
  "Fusion"
];

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

  // Ingredients handlers
  const handleAddIngredient = () => {
    const trimmed = currentIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentIngredient("");
    }

  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
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
    if (ingredients.length === 0) newErrors.ingredients = "Ingredients are required.";
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
        ingredients, // send as array
        image: imageUrl,
      };

      await axios.post("http://localhost:3001/recipes", recipeData);

      toast.success("Recette ajoutée avec succès ! 🎉");

      setTimeout(() => navigate("/admin"), 600);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout ❌");
    }
  };

  const handleCancel = () => setShowModal(false);

  return (
    <div className="flex justify-center mt-12 px-4">
      <form className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-400">
          Add a Recipe
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <input
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
          </div>

<div className="relative">
  <div className="flex items-center border border-gray-300 rounded-lg">
    <input
      placeholder="Country"
      className="w-full p-3 rounded-lg focus:outline-none"
      value={country}
      readOnly
    />

    {/* Icon */}
    <button
      type="button"
      onClick={() => setShowCountryList(!showCountryList)}
      className="px-3 text-gray-500 hover:text-black"
    >
      ▼
    </button>
  </div>

  {showCountryList && (
    <ol className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
      {countries.map((ct, i) => (
        <li
          key={i}
          className="p-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setCountry(ct);
            setShowCountryList(false);
          }}
        >
          {ct}
        </li>
      ))} 
    </ol>
  )}

  {errors.country && (
    <p className="text-red-500 mt-1 text-sm">{errors.country}</p>
  )}
</div>


<div className="relative">
  <div className="flex items-center border border-gray-300 rounded-lg">
    <input
      placeholder="Category"
      className="w-full p-3 rounded-lg focus:outline-none"
      value={category}
      readOnly
    />

    {/* Icon */}
    <button
      type="button"
      onClick={() => setShowCategoryList(!showCategoryList)}
      className="px-3 text-gray-500 hover:text-black"
    >
      ▼
    </button>
  </div>

  {showCategoryList && (
    <ol className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
      {categories.map((cat, i) => (
        <li
          key={i}
          className="p-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setCategory(cat);
            setShowCategoryList(false);
          }}
        >
          {cat}
        </li>
      ))}
    </ol>
  )}

  {errors.category && (
    <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
  )}
</div>


          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description}</p>}
          </div>

          {/* Steps */}
          <div>
            <textarea
              placeholder="Steps (Press Enter to go to the next line)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            {errors.steps && <p className="text-red-500 mt-1 text-sm">{errors.steps}</p>}
          </div>

          {/* Ingredients dynamic input */}
          <div>
            <div className="flex gap-2 flex-wrap">
              {ingredients.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleRemoveIngredient(index)}
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
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className=" bg-yellow-500 text-white px-4 py-2 cursor-pointer rounded-lg flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {errors.ingredients && <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>}
          </div>

          {/* Image */}
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

        {/* Submit */}
        <button
          onClick={handleAddClick}
          className="w-full bg-yellow-500 hover:bg-yellow-600 mt-4 cursor-pointer text-white py-2 rounded-lg font-semibold"
        >
          Ajouter
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 relative p-0">
            {/* Header */}
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-500" />
                Confirmation
              </h3>
              <button
                onClick={handleCancel}
                className="text-zinc-400 hover:text-zinc-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <p className="text-zinc-600 mb-2">
                Are you sure you want to add this recipe?
              </p>
            </div>

            {/* Footer */}
            <div className="bg-stone-50 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg text-zinc-600 font-medium hover:bg-zinc-200 transition"
              >
                No
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 shadow-md transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
}