import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PhotoCard from './PhotoCard';

function PhotoGrid() {
  const { filteredPhotos, searchTerm } = useContext(AppContext);

  if (filteredPhotos.length === 0) {
    return (
      <div className="py-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <h3 className="text-base font-medium text-gray-900 mb-1">No photos found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {searchTerm
            ? `No photos found matching author "${searchTerm}".`
            : 'No photos available to display.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredPhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default PhotoGrid;
