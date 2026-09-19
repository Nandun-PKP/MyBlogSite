import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Tags, Plus, Trash2, Folder, FolderTree } from 'lucide-react';

const ManageCategories = () => {
  const { categories, addCategory, deleteCategory, addSubcategory, deleteSubcategory } = useContext(NoteContext);
  const [newCatName, setNewCatName] = useState('');
  const [newSubcatName, setNewSubcatName] = useState({});

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory(newCatName.trim());
      setNewCatName('');
    }
  };

  const handleAddSubcat = (e, catId) => {
    e.preventDefault();
    const subName = newSubcatName[catId];
    if (subName && subName.trim()) {
      addSubcategory(catId, subName.trim());
      setNewSubcatName({ ...newSubcatName, [catId]: '' });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Tags className="w-8 h-8 mr-3 text-blue-600" />
          Manage Categories
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Add or remove categories and subcategories.</p>
      </header>

      {/* Add New Category */}
      <form onSubmit={handleAddCategory} className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Category</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="e.g. Machine Learning"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            <Plus className="w-5 h-5 inline-block mr-1" /> Add
          </button>
        </div>
      </form>

      {/* List Categories */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Folder className="w-5 h-5 mr-2 text-blue-500" />
                {cat.name}
              </h3>
              <button
                onClick={() => { if(window.confirm('Delete category?')) deleteCategory(cat.id) }}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                <FolderTree className="w-4 h-4 mr-1.5" /> Subcategories
              </h4>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {cat.subcategories.length === 0 ? (
                  <span className="text-sm text-gray-400 italic">No subcategories yet.</span>
                ) : (
                  cat.subcategories.map((subcat) => (
                    <div key={subcat} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg pl-3 pr-1 py-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{subcat}</span>
                      <button 
                        onClick={() => deleteSubcategory(cat.id, subcat)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={(e) => handleAddSubcat(e, cat.id)} className="flex gap-2 max-w-sm mt-4">
                <input
                  type="text"
                  placeholder="New subcategory..."
                  value={newSubcatName[cat.id] || ''}
                  onChange={(e) => setNewSubcatName({ ...newSubcatName, [cat.id]: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
                <button type="submit" className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors">
                  Add
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
