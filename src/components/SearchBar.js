import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearch]);

  const handleClear = () => {
    setLocalSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="🔍 Search videos by title, genre, or description..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="search-input"
        />
        {localSearchTerm && (
          <button onClick={handleClear} className="search-clear">
            ✕
          </button>
        )}
      </div>
      <div className="search-suggestions">
        <span className="suggestion-tag" onClick={() => setLocalSearchTerm('Adventure')}>
          Adventure
        </span>
        <span className="suggestion-tag" onClick={() => setLocalSearchTerm('Family')}>
          Family
        </span>
        <span className="suggestion-tag" onClick={() => setLocalSearchTerm('Fantasy')}>
          Fantasy
        </span>
        <span className="suggestion-tag" onClick={() => setLocalSearchTerm('HD')}>
          HD Quality
        </span>
      </div>
    </div>
  );
};

export default SearchBar;