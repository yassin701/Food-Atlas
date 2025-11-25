import axios from "axios";

const API_URL = "http://localhost:3001/recipes"

export const getRecipes = async () => {
    const response = await axios.get(API_URL);

    if(!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    return response.data;
}