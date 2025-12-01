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

    if (!name.trim()) newErrors.name = "Le nom est obligatoire.";
    if (!country.trim()) newErrors.country = "Le pays est obligatoire.";
    if (!category.trim()) newErrors.category = "La catégorie est obligatoire.";
    if (!description.trim()) newErrors.description = "La description est obligatoire.";
    if (!ingredients.trim()) newErrors.ingredients = "Les ingrédients sont obligatoires.";
    if (!imageFile) newErrors.image = "Veuillez importer une image.";

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
        ingredients,
        image: imageUrl,
      };

      await axios.post("http://localhost:3001/recipes", recipeData);

      toast.success("Recette ajoutée avec succès ! 🎉");

      setTimeout(() => navigate("/recipes"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout ❌");
    }
  };

  const handleCancel = () => setShowModal(false);

  return (


    <div className="flex justify-center mt-10 px-4">
      <form className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Ajouter une recette
        </h2>

        {/* Inputs */}
        <input
          placeholder="Nom"
          className="w-full border-2 p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          placeholder="Pays"
          className="w-full border-2 p-2 rounded mb-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}

        <input
          placeholder="Catégorie"
          className="w-full border-2 p-2 rounded mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <p className="text-red-500">{errors.category}</p>}

        <textarea
          placeholder="Description"
          className="w-full border-2 p-2 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <textarea
          placeholder="Steps"
          className="w-full border-2 p-2 rounded mb-2"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        {errors.steps && <p className="text-red-500">{errors.steps}</p>}

        <textarea
          placeholder="Ingrédients"
          className="w-full border-2 p-2 rounded mb-2"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}

        <input
          type="file"
          accept="image/*"
          className="w-full border-2 p-2 rounded mb-2"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}

        {/* Button */}
        <button
          onClick={handleAddClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Ajouter
        </button>
      </form>

      {/* Modal confirm */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <p className="mb-4 text-gray-700">Tu es sûr de vouloir ajouter cette recette ?</p>
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
