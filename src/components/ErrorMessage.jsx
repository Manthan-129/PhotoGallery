import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function ErrorMessage() {
  const { error } = useContext(AppContext);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <h3 className="text-lg font-semibold text-red-800 mb-1">
        Unable to load gallery photos
      </h3>
      <p className="text-sm text-red-600 mb-4">
        {error || 'Failed to fetch photos from Picsum Photos.'}
      </p>
      <p className="text-xs text-gray-500">
        Please check your network connection or refresh the page.
      </p>
    </div>
  );
}

export default ErrorMessage;
