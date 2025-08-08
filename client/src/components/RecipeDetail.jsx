import React from "react";
import { X, Clock, Users, ChefHat, Edit2, Trash2 } from "lucide-react";

const RecipeDetail = ({ recipe, onClose, onEdit, onDelete }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 md:h-80 object-cover rounded-xl"
          />
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {recipe.name}
                </h1>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={onEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(recipe.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{recipe.cookTime || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{recipe.servings || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ChefHat className="w-5 h-5 mr-2" />
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Instructions
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.steps}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RecipeDetail;
