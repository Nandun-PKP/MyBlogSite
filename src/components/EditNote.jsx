import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Save, ArrowLeft } from 'lucide-react';

const EditNote = () => {
  const { id } = useParams();
  const { getNote, updateNote, categories } = useContext(NoteContext);
  const navigate = useNavigate();

  const note = getNote(id);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [content, setContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCategory(note.category);
      setSubcategory(note.subcategory || '');
      setContent(note.content);
      setYoutubeUrl(note.youtubeUrl || '');
      setFileUrl(note.fileUrl || '');
    }
  }, [note]);

  if (!note) {
    return <div className="p-8 text-center text-gray-500">Loading or note not found...</div>;
  }

  const activeCategoryObj = categories.find((c) => c.name === category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) return;

    updateNote(id, {
      title,
      category,
      subcategory: subcategory || '',
      content,
      youtubeUrl: youtubeUrl || '',
      fileUrl: fileUrl || ''
    });
    
    navigate(`/note/${id}`);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Cancel Edit
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Edit Note
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white appearance-none"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory('');
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subcategory</label>
              <select
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white appearance-none disabled:opacity-50"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                disabled={!activeCategoryObj || activeCategoryObj.subcategories.length === 0}
              >
                <option value="">-- None --</option>
                {activeCategoryObj?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">YouTube Link (Optional)</label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File / Reference Link (Optional)</label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                placeholder="https://drive.google.com/..."
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <textarea
              required
              rows="12"
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="submit" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm">
              <Save className="w-5 h-5 mr-2" /> Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
