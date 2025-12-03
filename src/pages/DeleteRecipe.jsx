import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteRecipe } from "../api/recipesApi";

export default function DeleteRecipe({id , isOpen}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await deleteRecipe(id);

      toast.success("Recipe deleted successfully!");

      navigate("/admin");
    } catch (error) {
      toast.error("Failed to delete recipe!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    isOpen(false)
  };


  return (
    <div className=" inset-0 bg-black/50 flex justify-center items-center p-4 absolute">
      <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
        <h3 className="text-lg font-bold mb-4">Delete This Recipe?</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this recipe?
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
          >
            Cancel
          </button>

          <button
          onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
          
            {loading ? "Deleting..." : "Confirm"}
          </button>

          
        </div>
      </div>
    </div>
  );
}
