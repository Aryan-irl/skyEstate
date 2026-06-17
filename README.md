# skyEstate 🚀

skyEstate is a premium, full-stack real-estate listing web application that connects users with a curated collection of verified homes, luxury apartments, and modern spaces. Built with Node.js, Express, MongoDB, React (Vite), and Supabase Storage.

Live Link:https://sky-estate-teal.vercel.app/

---

## Features ✨

- **User Authentication**: Secure SignUp, SignIn, and Google OAuth integration.
- **Dynamic Real Estate Listings**: Create, edit, update, view, and delete listings.
- **Dynamic Search & Filtering**: Search by keyword, type (Rent / Sale), features (Parking, Furnished, Offers), and sorting parameters (Newest, Price ascending/descending, etc.).
- **Supabase Storage Integration**: Fast and public image uploading for profile avatars and listing images.
- **Interactive Carousel Slides**: Smooth property slides using Swiper.js for the recent offers, rent, and sale listing categories.
- **Smart Listing Ownership**: Listings dynamically display edit/delete controls for their respective owners and Call/WhatsApp contact buttons for prospective buyers.
- **Auto-Calculated Offers**: Form dynamically calculates discounted pricing so listings display correct values instantly.

---

## Tech Stack 🛠️

- **Frontend**: React.js (Vite), Redux Toolkit, Redist Persist, Tailwind CSS, Swiper.js, React Icons, React Router DOM.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM), JWT, Cookie Parser.
- **Storage**: Supabase Storage.
- **Deployment**: Configured for Render, Vercel, or similar cloud providers.

---

## Installation & Local Setup 💻

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18+ recommended).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Cluster (or local MongoDB database).
- A [Supabase](https://supabase.com) Project with a public storage bucket named **`images`**.

### 1. Clone the Repository
```bash
git clone https://github.com/Aryan-irl/skyEstate.git
cd skyEstate
```

### 2. Install Dependencies
Install dependencies for both the root (backend) and the client (frontend):
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your credentials:
```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_string
```

> [!NOTE]
> The frontend Supabase client is configured in [supabase.js](file:///client/src/supabase.js). Make sure your Supabase project contains a **public bucket** named `images` with storage policies set to allow public (`anon`) `INSERT` and `SELECT` operations.

### 4. Running the App Locally

Start the backend server:
```bash
# In the root directory
npm run dev
```

Start the frontend development server:
```bash
# In the client directory
npm run dev --prefix client
```

Open `http://localhost:5173` in your browser to view the application.

---

## Deployment Guide 🚀

The project is pre-configured for one-click deployment to hosting platforms like **Render.com**.

### Deploying on Render (Web Service)
1. **Connect Repository**: Link your GitHub repository `Aryan-irl/skyEstate` to Render.
2. **Configure Service Details**:
   - **Environment**: `Node`
   - **Build Command**: `npm run build` *(runs root install, client install, and builds React client)*
   - **Start Command**: `npm start` *(starts the backend which serves the React static build)*
3. **Add Environment Variables**:
   - `MONGO`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: A secure key for authenticating user sessions.
4. **Deploy**: Render will build the React frontend, package it with the Express backend, and launch the site live!
