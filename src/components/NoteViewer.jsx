import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Calendar, Tag, ArrowLeft, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const NoteViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNote, deleteNote } = useContext(NoteContext);
  const { isLoggedIn } = useContext(AuthContext);
  
  const note = getNote(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!note) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Note not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
      navigate('/');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to notes
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {note.title}
            </h1>
            
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate(`/edit/${note.id}`)}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit Note"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              {note.category}
            </span>
            {note.subcategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-medium">
                {note.subcategory}
              </span>
            )}
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {format(new Date(note.date), 'MMMM dd, yyyy')}
            </span>
          </div>
        </div>

        {(note.youtubeUrl || note.fileUrl) && (
          <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-6">
            {note.youtubeUrl && (() => {
              const getYoutubeId = (url) => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
              };
              const videoId = getYoutubeId(note.youtubeUrl);
              return videoId ? (
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-sm">
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[300px] md:h-[450px]"
                  ></iframe>
                </div>
              ) : (
                <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
                  View Video Link
                </a>
              );
            })()}

            {note.fileUrl && (
              <div>
                <a 
                  href={note.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  View Attached File / Link
                </a>
              </div>
            )}
          </div>
        )}

        <div className="p-6 md:p-8 prose prose-blue dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default NoteViewer;
