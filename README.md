# Photo Gallery Web App — Celebrare Frontend Assignment

A high-performance, responsive React photo gallery application built with **React**, **Vite**, and **Tailwind CSS**. It fetches 30 curated photos from the public Picsum Photos API, displays them in a responsive grid across devices, provides real-time search filtering by author, and manages persistent favourites using React's `useReducer` and `localStorage`, with shared state coordinated via React's Context API.

---

## 📋 Table of Contents
- [Requirements Checklist](#-requirements-checklist)
- [Folder Structure](#-folder-structure)
- [Setup and Running Locally](#-setup-and-running-locally)
- [Architecture & Implementation Highlights](#-architecture--implementation-highlights)
- [Screen Recording Guide (5-Minute Video Script)](#-screen-recording-guide-5-minute-video-script)

---

## ✅ Requirements Checklist

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **1. Project Setup** | React + Vite + Tailwind CSS. Basic neutral colors. No external UI libraries (no MUI, Ant Design, Bootstrap). | **Done** |
| **2. Fetch Photos from API** | Fetches 30 photos on load from Picsum Photos API using `axios` with `async/await`. Pure blue CSS loading spinner with `Loading Photos.` & template error message. Refetch button available to re-fetch 30 photos on demand. | **Done** |
| **3. Responsive Grid** | Desktop: 4 columns (`lg:grid-cols-4`). Tablet: 2 columns (`md:grid-cols-2`). Mobile: 1 column (`grid-cols-1`). Each card displays photo, author name, and heart button. | **Done** |
| **4. Search Filter** | Real-time filtering by author name as user types. No page reload. No API call on search. Dedicated search bars for both Dashboard and Favorites. | **Done** |
| **5. Favourites with `useReducer`** | Toggles photo as favourite with heart icon button using `img` tags. Managed via `useReducer` with `.map()` traversal (no `state.includes`). Moving favourited photos to the Favorites page. Persists across refreshes using `localStorage`. | **Done** |
| **6. Custom Hook** | Fetch logic extracted into `useFetchPhotos` with `async/await` and reload trigger. Returns `{ photos, loading, error, refetchPhotos }`. Consumed through `AppContext`. | **Done** |
| **7. `useCallback` + `useMemo`** | `useCallback` on search handlers and toggle actions. `useMemo` computes the filtered photo lists for both Dashboard and Favorites without `Set`. | **Done** |

---

## 📁 Folder Structure

```
WebPicture/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header with Dashboard, Favorites, and Refetch buttons
│   │   ├── SearchBar.jsx       # Controlled real-time search input for Dashboard
│   │   ├── PhotoCard.jsx       # Card displaying photo, author, and heart button (using img)
│   │   ├── PhotoGrid.jsx       # Responsive grid layout (4 cols desktop, 2 tablet, 1 mobile)
│   │   ├── FavoriteImages.jsx  # Page displaying favourited photos with dedicated search bar
│   │   ├── LoadingSpinner.jsx  # Blue CSS spinning circle with text "Loading Photos."
│   │   └── ErrorMessage.jsx    # Clean template message if API request fails
│   ├── context/
│   │   └── AppContext.jsx      # Context and provider managing shared state & images
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook fetching 30 photos using axios & async/await
│   ├── reducers/
│   │   └── favouritesReducer.js# Pure reducer with .map traversal & localStorage initializer
│   ├── App.jsx                 # Main application coordinator with page switching
│   ├── index.css               # Tailwind CSS imports & base styles
│   └── main.jsx                # Root entry point with BrowserRouter & AppContextProvider (value prop)
├── index.html                  # HTML template
├── package.json                # Dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Documentation and screen recording guide
```

---

## 🚀 Setup and Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Run production build:**
   ```bash
   npm run build
   ```

4. **Run linter:**
   ```bash
   npm run lint
   ```

---

## 🔍 Architecture & Implementation Highlights

- **Shared State via `useContext`:** Components directly destructure `const { ... } = useContext(AppContext);`, removing prop drilling and parameter clutter.
- **Button-Based Page Switching:** The header features buttons for **Dashboard** and **Favorites**, allowing switching between views without `<Link>` routing.
- **On-Demand Refetching:** A **Refetch Photos** button in the header re-fetches 30 photos from the Picsum API on demand.
- **Dynamic Favorite Separation:** Favorited photos on the Dashboard are automatically moved to the dedicated **Favorites** view.
- **Filtering without `Set`:** Computes `availablePhotos` cleanly using array `.filter()` and `.map()` traversal, completely avoiding `Set`.
- **Dedicated Search Bars:** Both the Dashboard and Favorites views feature real-time search inputs that filter their respective displayed photos by author name.
- **Custom Hook (`useFetchPhotos`):** Uses `async/await` with `axios.get('https://picsum.photos/v2/list?limit=30')`. Handles unmounting safely using an `ignore` flag.
- **`useReducer` for Favourites:** Uses `.map()` array traversal (no `state.includes`) to toggle photos and synchronizes with `localStorage` for cross-session persistence.
- **`useCallback` & `useMemo`:** Memoizes search change handlers and computed filtered photo lists.
- **`img` Tags Throughout:** All icons (heart, search, clear) use `<img>` tags with data URIs, avoiding raw SVG path tags.
- **Loading Display:** Centered blue CSS circle (`border-4 border-blue-600 border-t-transparent rounded-full animate-spin`) with the text `Loading Photos.` below it.

---

## 🎙️ Screen Recording Guide (5-Minute Video Script)

### Minute 1: Show the App Working
- Open `http://localhost:5173/` in your browser.
- Point out the centered blue circle loading indicator with `Loading Photos.`
- Demonstrate the 4-column desktop layout on the **Dashboard**. Resize browser to show tablet (2 cols) and mobile (1 col).
- In the search bar, type an author name to demonstrate real-time filtering without page reloads.
- Click the heart icon on 2–3 photos: notice they are removed from the Dashboard and the Favorites counter increments.
- Click the **Favorites** button in the header: show the favourited photos and test the dedicated author search bar.
- Click the **Refetch Photos** button in the header: show photos loading fresh from the API.
- Hit **Refresh** (F5): show that all favourites persist from `localStorage`.

### Minute 2: Open `useFetchPhotos` Hook
- Open `src/hooks/useFetchPhotos.js`.
- Explain the `async/await` fetch logic using `axios.get('https://picsum.photos/v2/list?limit=30')`.
- Point out the `refetchPhotos` callback that triggers re-fetching fresh photos on demand.
- Point out the React `ignore` cleanup flag that guards against state updates after unmount.

### Minute 3: Open `useReducer` Code
- Open `src/reducers/favouritesReducer.js`.
- Explain the `TOGGLE_FAVOURITE` action: it uses `.map()` traversal to check if the photo already exists, then either filters it out or appends it.
- Point out `getInitialFavourites()` reading from `localStorage`.
- Explain why `useReducer` was chosen: it cleanly separates complex collection updates from component rendering.

### Minute 4: Open `useCallback` and `useMemo`
- Open `src/context/AppContext.jsx`.
- Explain `useCallback`: memoizes search change handlers so child components maintain stable function references.
- Explain `useMemo`: computes `availablePhotos`, `filteredPhotos`, and `filteredFavourites` without `Set`, ensuring filter operations only re-run when photos or search queries change.

### Minute 5: Show One Difficult Part & Solution
- Discuss managing state synchronization between `useReducer` and `localStorage` while dynamically moving favorited photos between the Dashboard and Favorites views without prop drilling, solved cleanly using `useContext`.
