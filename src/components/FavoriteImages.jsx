import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PhotoCard from './PhotoCard';

function FavoriteImages() {
  const {
    filteredFavourites,
    favSearchTerm,
    handleFavSearchChange,
    setFavSearchTerm,
    searchImg,
    clearImg,
  } = useContext(AppContext);

  const handleClear = () => {
    setFavSearchTerm('');
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <img src={searchImg} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={favSearchTerm}
            onChange={handleFavSearchChange}
            placeholder="Search favorite photos by author name..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm"
          />
          {favSearchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <img src={clearImg} alt="Clear" className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {filteredFavourites.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-base font-medium text-gray-900 mb-1">
            {favSearchTerm ? 'No matching favorite photos' : 'No favorite photos yet'}
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            {favSearchTerm
              ? `No favorite photos found matching author "${favSearchTerm}".`
              : 'Photos you mark as favorite will be displayed here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFavourites.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteImages;
