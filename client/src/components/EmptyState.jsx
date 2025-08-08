import React from "react";
import { ChefHat, Plus } from "lucide-react";

const EmptyState = ({ searchTerm, recipes, onAddFirstRecipe }) => {
  if (searchTerm) {
    // No results for search
    return (
      <div className="text-center py-12">
        <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search terms or add a new recipe
        </p>
      </div>
    );
  }
  // No recipes at all
  if (!recipes.length) {
    return (
      <div className="text-center py-12">
        <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No recipes yet
        </h3>
        <p className="text-gray-500 mb-6">
          Start building your recipe collection by adding your first recipe
        </p>
        <button
          onClick={onAddFirstRecipe}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Recipe
        </button>
      </div>
    );
  }
  return null;
};

export default EmptyState;
