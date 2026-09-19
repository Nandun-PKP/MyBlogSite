import React, { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real-time data from Firestore
  useEffect(() => {
    const unsubscribeNotes = onSnapshot(collection(db, 'notes'), (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by date descending
      notesData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotes(notesData);
    });

    const unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const catsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(catsData);
      setLoading(false);
    });

    return () => {
      unsubscribeNotes();
      unsubscribeCategories();
    };
  }, []);

  // Notes CRUD
  const addNote = async (newNote) => {
    try {
      await addDoc(collection(db, 'notes'), {
        ...newNote,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  const getNote = (id) => {
    return notes.find((note) => note.id === id);
  };

  const updateNote = async (id, updatedFields) => {
    try {
      await updateDoc(doc(db, 'notes', id), updatedFields);
    } catch (error) {
      console.error("Error updating note: ", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  // Categories CRUD
  const addCategory = async (name) => {
    try {
      await addDoc(collection(db, 'categories'), {
        name,
        subcategories: []
      });
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const addSubcategory = async (categoryId, subName) => {
    const cat = categories.find(c => c.id === categoryId);
    if (cat) {
      try {
        await updateDoc(doc(db, 'categories', categoryId), {
          subcategories: [...cat.subcategories, subName]
        });
      } catch (error) {
        console.error("Error adding subcategory: ", error);
      }
    }
  };

  const deleteSubcategory = async (categoryId, subName) => {
    const cat = categories.find(c => c.id === categoryId);
    if (cat) {
      try {
        await updateDoc(doc(db, 'categories', categoryId), {
          subcategories: cat.subcategories.filter(s => s !== subName)
        });
      } catch (error) {
        console.error("Error deleting subcategory: ", error);
      }
    }
  };

  return (
    <NoteContext.Provider value={{ 
      notes, addNote, getNote, updateNote, deleteNote,
      categories, addCategory, deleteCategory, addSubcategory, deleteSubcategory
    }}>
      {loading ? (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-xl font-medium text-gray-500 dark:text-gray-400">Loading data from Firebase...</div>
        </div>
      ) : children}
    </NoteContext.Provider>
  );
};
