import React from "react";
import { Clock, Users } from "lucide-react";

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
          {recipe.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {recipe.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.cookTime || "N/A"}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings || "N/A"}
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {Array.isArray(recipe.ingredients)
            ? recipe.ingredients.slice(0, 3).join(", ")
            : ""}
          {Array.isArray(recipe.ingredients) &&
            recipe.ingredients.length > 3 &&
            "..."}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
