import React from 'react';

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="filter-group">
          <label>📁 Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>📊 Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="title">Title (A-Z)</option>
            <option value="rating">Rating (High-Low)</option>
            <option value="year">Year (Latest)</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        <div className="filter-group">
          <label>👁️ View:</label>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
            >
              🔳 Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
            >
              📋 List
            </button>
          </div>
        </div>
      </div>

      <div className="results-info">
        <span className="results-count">
          📈 {totalResults} video{totalResults !== 1 ? 's' : ''} found
        </span>
      </div>
    </div>
  );
};

export default FilterBar;