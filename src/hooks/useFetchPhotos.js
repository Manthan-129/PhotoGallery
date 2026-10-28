import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?limit=30');
        if (!ignore) {
          setPhotos(response.data);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to fetch photos');
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;
