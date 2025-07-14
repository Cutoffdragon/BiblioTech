# 📖 BiblioTech

**Full stack library application with Google Books Api integration and user authentication.**

---

## 🧾 Description

BiblioTech allows the search and archival of books using the Google books API and the openLibrary API.

Users can create an account to create their own reading archive, as well as personalize their experience by favoriting authors, books, and customizing the look and feel of the website.

---

## 🚀 Live Demo

🌐 [Visit BiblioTech Live](https://bibliotech-production-7fce.up.railway.app)

---

## 🛠️ Tech Stack

**Frontend:**
- Pug (Formerly known as jade, an HTML preprocessor)
- SASS (CSS Preprocessor)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Google Books API

**Tools:**
- Railway (Deployment)
- GitHub
- Passport for authentication
- Google Books Preview wizard for book previews

---

## ✨ Features

- ✅ Register / Log In / Log Out using Passport sessions
- 📚 Search any book or author available in Google Books or Open Library
- 🔖 Create an account to keep a booklist and add user preferences
- 🌈 Authenticated users may choose from one of 5 different themes for the look of BiblioTech
- 🔍 Search for books and authors by keyword
- 📱 Fully responsive for mobile and tablet devices

---

## 🧪 How to Run Locally

```bash
# Clone the central repository
git clone https://github.com/Cutoffdragon/BiblioTech.git

# Install client dependencies
npm install

# Configure environment variables in both repos
# Example: .env
DB=mongo_uri
SESSION_SECRET=session_secret
PORT=3000

# Run the app in one terminal
npm start

```

## 🧙 About the Author

Created by Jason LaGrasse — Full-stack developer and problem-solver ||
The future of web development starts here ||  
Portfolio: [cutoffdragon.com](https://cutoffdragon.com)  