import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function PhotoCard(props) {
  const photo = props.photo;
  const { favourites, handleToggleFavourite, activeHeartImg, inactiveHeartImg, getImageUrl } = useContext(AppContext);

  let isFavourite = false;
  favourites.map((item) => {
    if (item.id === photo.id) {
      isFavourite = true;
    }
    return item;
  });

  const handleHeartClick = () => {
    handleToggleFavourite(photo);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative w-full aspect-[3/2] bg-gray-100 overflow-hidden">
        <img
          src={getImageUrl(photo.id)}
          alt={photo.author}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {isFavourite && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Favourite
          </span>
        )}
      </div>
      <div className="p-4 flex items-center justify-between gap-2 flex-1">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Author
          </p>
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {photo.author}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleHeartClick}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <img
            src={isFavourite ? activeHeartImg : inactiveHeartImg}
            alt="Toggle Favourite"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
