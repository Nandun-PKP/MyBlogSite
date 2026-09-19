import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Search, Calendar, Tag, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const Home = () => {
  const { notes, categories } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcat, setActiveSubcat] = useState('All');

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || note.category === activeCategory;
    const matchesSubcat = activeSubcat === 'All' || note.subcategory === activeSubcat;
    return matchesSearch && matchesCat && matchesSubcat;
  });

  const currentCategoryObj = categories.find(c => c.name === activeCategory);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Notes</h1>
        <p className="text-gray-500 dark:text-gray-400">Documenting my learning journey.</p>
      </header>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search notes by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setActiveCategory('All'); setActiveSubcat('All'); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'All'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => { setActiveCategory(category.name); setActiveSubcat('All'); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.name
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Subcategories (if any) */}
      {activeCategory !== 'All' && currentCategoryObj && currentCategoryObj.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 ml-2 p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 py-1.5 px-2 flex items-center">
            <ChevronRight className="w-4 h-4 mr-1" />
            Subcategories:
          </span>
          <button
            onClick={() => setActiveSubcat('All')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeSubcat === 'All'
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white'
                : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Any
          </button>
          {currentCategoryObj.subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => setActiveSubcat(subcat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeSubcat === subcat
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Link key={note.id} to={`/note/${note.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      <Tag className="w-3 h-3 mr-1" />
                      {note.category}
                    </span>
                    {note.subcategory && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {note.subcategory}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {note.content.replace(/[#*`_\[\]]/g, '').substring(0, 150)}...
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {format(new Date(note.date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No notes found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
