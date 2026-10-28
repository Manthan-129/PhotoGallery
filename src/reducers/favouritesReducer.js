function getInitialFavourites() {
  try {
    const saved = localStorage.getItem('photo_gallery_favourites');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photo = action.payload;
      let exists = false;
      state.map((item) => {
        if (item.id === photo.id) {
          exists = true;
        }
        return item;
      });

      if (exists) {
        return state.filter((item) => item.id !== photo.id);
      }
      return [...state, photo];
    }
    default:
      return state;
  }
}

export { favouritesReducer, getInitialFavourites };
