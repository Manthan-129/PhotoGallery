import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PhotoGrid from './components/PhotoGrid';
import FavoriteImages from './components/FavoriteImages';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { loading, error, activePage } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && (
          <>
            {activePage === 'dashboard' && (
              <>
                <SearchBar />
                <PhotoGrid />
              </>
            )}
            {activePage === 'favorites' && <FavoriteImages />}
          </>
        )}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        Celebrare Frontend Assignment
      </footer>
    </div>
  );
}

export default App;
