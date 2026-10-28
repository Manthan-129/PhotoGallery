import { createContext, useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, getInitialFavourites } from '../reducers/favouritesReducer';

const AppContext = createContext(null);

function AppContextProvider(props) {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites);
  const [activePage, setActivePage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [favSearchTerm, setFavSearchTerm] = useState('');

  const activeHeartImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  const inactiveHeartImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  const searchImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
  const clearImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  const getImageUrl = (id) => `https://picsum.photos/id/${id}/600/400`;

  useEffect(() => {
    try {
      localStorage.setItem('photo_gallery_favourites', JSON.stringify(favourites));
    } catch (err) {
      console.error(err);
    }
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFavSearchChange = useCallback((e) => {
    setFavSearchTerm(e.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo });
  }, []);

  const availablePhotos = useMemo(() => {
    return photos.filter((photo) => {
      let isFav = false;
      favourites.map((fav) => {
        if (fav.id === photo.id) {
          isFav = true;
        }
        return fav;
      });
      return !isFav;
    });
  }, [photos, favourites]);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return availablePhotos;
    }
    return availablePhotos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [availablePhotos, searchTerm]);

  const filteredFavourites = useMemo(() => {
    const query = favSearchTerm.trim().toLowerCase();
    if (!query) {
      return favourites;
    }
    return favourites.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [favourites, favSearchTerm]);

  const contextValue = {
    photos,
    availablePhotos,
    filteredPhotos,
    favourites,
    filteredFavourites,
    loading,
    error,
    activePage,
    setActivePage,
    searchTerm,
    setSearchTerm,
    handleSearchChange,
    favSearchTerm,
    setFavSearchTerm,
    handleFavSearchChange,
    handleToggleFavourite,
    activeHeartImg,
    inactiveHeartImg,
    searchImg,
    clearImg,
    getImageUrl,
    ...(props.value || {}),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
