# Personal Learning Blog & Note-Taking App

A modern, responsive, and minimalist personal learning blog built with **React** and **Tailwind CSS**. This application serves as a digital garden and note-taking platform designed to document the developer learning journey.

## 🚀 Features

- **Markdown Support:** Write and render notes beautifully with full Markdown support, including syntax highlighting for code snippets.
- **Categorization:** Organize your knowledge base efficiently with robust Categories and Subcategories.
- **Advanced Search & Filtering:** Instantly find your notes using keyword search and category filters.
- **Dark/Light Mode:** Integrated theme toggling for an optimal reading experience at any time of day.
- **Rich Media Integration:** Seamlessly embed YouTube videos and attach external reference files directly into your notes.
- **Secure Admin Panel:** Hidden authentication system allowing only authorized access to add, edit, or delete notes and manage categories.
- **Cloud Database:** Real-time data synchronization and persistence powered by Firebase Firestore.

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS v4, Lucide React (Icons)
- **Database:** Firebase Firestore
- **Markdown Processing:** react-markdown, rehype-highlight
- **Deployment:** Vercel

## 📖 How It Works

1. **Viewing Notes:** By default, visitors can view all published notes, browse through categories, and use the search function. The application acts as a read-only public blog for guests.
2. **Admin Access:** The owner can access the secure dashboard by navigating to the hidden `/login` route. Upon entering the correct passcode, the Admin gains access to the full suite of management tools.
3. **Managing Content:** Once authenticated, the Admin can create new Markdown-based notes, categorize them, embed media, and perform full CRUD (Create, Read, Update, Delete) operations on the content.
4. **Data Persistence:** All content is instantly synchronized with Firebase Firestore, ensuring data is securely stored in the cloud and instantly reflected on the front end.

## 💻 Local Setup

1. Clone the repository
2. Install dependencies using `npm install`
3. Add your Firebase configuration to `src/utils/firebase.js`
4. Start the development server with `npm run dev`

---
*Built with ❤️ for continuous learning and knowledge sharing.*
