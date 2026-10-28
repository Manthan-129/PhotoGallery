import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Header() {
  const { favourites, activeHeartImg, activePage, setActivePage } = useContext(AppContext);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-xs text-gray-500">Picsum Photos</p>
        </div>

        <nav className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePage('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePage === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setActivePage('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePage === 'favorites'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            }`}
          >
            <img src={activeHeartImg} alt="Favorites" className="w-4 h-4" />
            <span>
              Favorites ({favourites.length})
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
