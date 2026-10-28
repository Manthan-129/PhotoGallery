import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function SearchBar() {
  const { searchTerm, handleSearchChange, setSearchTerm, searchImg, clearImg } = useContext(AppContext);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <img src={searchImg} alt="Search" className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search photos by author name..."
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
        />
        {searchTerm && (
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
  );
}

export default SearchBar;
