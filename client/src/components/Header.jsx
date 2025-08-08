import React from 'react';
import { ChefHat, Plus, Search } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm, setShowAddForm }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <ChefHat className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Recipe Book</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes, ingredients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
